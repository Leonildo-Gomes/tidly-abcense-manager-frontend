"use client";

import { useOrganizationList, useSignUp } from "@clerk/nextjs";
import { AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import StepIndicator from "./step-indicator";
import CompanyStep from "./steps/company-step";
import PlanStep from "./steps/plan-step";
import VerificationStep from "./steps/verification-step";

type RegistrationData = {
  companyName: string;
  companyNumber: string;
  plan: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};


export default function RegisterHookForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isLoaded: isSignUpLoaded, signUp, setActive } = useSignUp();
  const { createOrganization, isLoaded: isOrgLoaded } = useOrganizationList();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<Partial<RegistrationData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [pendingOrgCreation, setPendingOrgCreation] = useState(false);

  // Initialize plan from URL
  useEffect(() => {
    const planParam = searchParams.get("plan");
    if (planParam) {
      setFormData((prev) => ({ ...prev, plan: planParam }));
    } else {
      setFormData((prev) => ({ ...prev, plan: "free" }));
    }
  }, [searchParams]);

  // Handle organization creation after session becomes active
  useEffect(() => {
    let isMounted = true;
    const createCompany = async () => {
      if (pendingOrgCreation && createOrganization) {
        setIsLoading(true);
        try {
          await createOrganization({
            name: formData.companyName!,
            //slug: formData.companyNumber!,
          });
          if (isMounted) {
            toast.success("Account & Company created successfully!");
            router.push("/dashboard");
          }
        } catch (err: any) {
          if (isMounted) {
            console.error("Org Creation Error:", err);
            toast.error(err.errors?.[0]?.message || "Failed to create company workspace.");
            setIsLoading(false);
          }
        }
      }
    };
    createCompany();
    return () => { isMounted = false; };
  }, [pendingOrgCreation, createOrganization, formData.companyName, formData.companyNumber, router]);

  const onCompanySubmit = (data: Partial<RegistrationData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  const onPlanSubmit = async () => {
    console.log("Plan submitted, checking Clerk load state...");
    if (!isSignUpLoaded) {
      console.error("Clerk sign-up is not loaded.");
      toast.error("Authentication service isn't ready. Please wait a moment.");
      return;
    }
    
    setIsLoading(true);
    console.log("Preparing to create user in Clerk...");

    try {
      // 1. Attempt to create User in Clerk with Company Email as Admin
      try {
        await signUp.create({
          emailAddress: formData.email!,
          password: formData.password!,
          firstName: formData.companyName!,
          lastName: "Admin",
        });
        console.log("User created successfully! status", signUp.status);
      } catch (createErr: any) {
        console.log("Create failed. Checking error...", createErr);
        // Extract the specific error message from Clerk (e.g., "Password has been found in an online data breach")
        const errorMessage = createErr.errors?.[0]?.longMessage || createErr.errors?.[0]?.message || "Registration failed. Please check your details and try again.";
        toast.error(errorMessage);
        setIsLoading(false);
        return;
      }
      console.log("User created successfully! createOrganization", createOrganization);
      // 2. Form completed immediately (Email Auth Disabled in Clerk)
      if (signUp.status === "complete") {
        await setActive({ session: signUp.createdSessionId });
        console.log("Session active, triggering org creation...");
        setPendingOrgCreation(true);
        return;
      }

      // 3. Prepare Verification (If Email Auth is somehow enabled in the future)
      if (signUp.status === "missing_requirements") {
        await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
        setStep(3); // Move to verification UI
      }

    } catch (err: any) {
      console.error("Registration Error:", err);
      const msg = err.errors?.[0]?.message || "Registration failed";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const onPlanSelect = (plan: string) => {
    setFormData((prev) => ({ ...prev, plan }));
  };

  const handleVerification = async (code: string) => {
    if (!isSignUpLoaded || !isOrgLoaded) return;
    setIsLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
        toast.error("Verification failed. Please try again.");
        setIsLoading(false);
        return;
      }

      // Verification Success!
      // 1. Set Session Active
      await setActive({ session: completeSignUp.createdSessionId });

      // 2. Trigger Organization Creation via useEffect
      setPendingOrgCreation(true);
    } catch (err: any) {
      console.error("Verification/Org Error:", err);
      toast.error(err.errors?.[0]?.message || "Something went wrong");
      setIsLoading(false);
    }
  };

  const currentPlan = formData.plan || "free";

  return (
    <div className="w-full">
      <div id="clerk-captcha"></div>
      <StepIndicator currentStep={step} />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <CompanyStep
            key="step1"
            defaultValues={{
              companyName: formData.companyName,
              companyNumber: formData.companyNumber,
              email: formData.email,
              password: formData.password,
            }}
            onNext={onCompanySubmit}
          />
        )}

        {step === 2 && (
          <PlanStep
            key="step2"
            selectedPlan={currentPlan}
            onSelect={onPlanSelect}
            onNext={onPlanSubmit}
            onBack={() => setStep(1)}
            isLoading={isLoading}
          />
        )}

        {step === 3 && (
          <VerificationStep
            key="step3"
            email={formData.email}
            onVerify={handleVerification}
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
