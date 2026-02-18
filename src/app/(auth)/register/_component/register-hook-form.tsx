"use client";

import { useOrganizationList, useSignUp } from "@clerk/nextjs";
import { AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import StepIndicator from "./step-indicator";
import CompanyStep from "./steps/company-step";
import PlanStep from "./steps/plan-step";
import UserStep from "./steps/user-step";
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

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState<Partial<RegistrationData>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Initialize plan from URL
  useEffect(() => {
    const planParam = searchParams.get("plan");
    if (planParam) {
      setFormData((prev) => ({ ...prev, plan: planParam }));
    } else {
      setFormData((prev) => ({ ...prev, plan: "free" }));
    }
  }, [searchParams]);

  const onCompanySubmit = (data: { companyName: string; companyNumber: string }) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  const onPlanSelect = (plan: string) => {
    setFormData((prev) => ({ ...prev, plan }));
  };

  const onUserSubmit = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    if (!isSignUpLoaded || !isOrgLoaded) return;

    const finalData = { ...formData, ...data } as RegistrationData;
    setFormData((prev) => ({ ...prev, ...data })); // Save user data to state
    setIsLoading(true);

    try {
      // 1. Create User in Clerk
      await signUp.create({
        emailAddress: finalData.email,
        password: finalData.password,
        firstName: finalData.firstName,
        lastName: finalData.lastName,
      });

      // 2. Prepare Verification
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setStep(4); // Move to verification UI
    } catch (err: any) {
      console.error("Registration Error:", err);
      const msg = err.errors?.[0]?.message || "Registration failed";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
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

      // 2. Create Organization
      if (createOrganization) {
        await createOrganization({
          name: formData.companyName!,
          slug: formData.companyNumber!,
        });

        // 3. Sync to Backend
        // await fetch('/api/companies', { ... })

        toast.success("Account & Company created!");
        router.push("/dashboard");
      } else {
        toast.success("Account created! Redirecting to setup...");
        router.push("/dashboard"); // Fallback
      }
    } catch (err: any) {
      console.error("Verification/Org Error:", err);
      toast.error(err.errors?.[0]?.message || "Something went wrong");
      setIsLoading(false);
    }
  };

  const currentPlan = formData.plan || "free";

  return (
    <div className="w-full">
      <StepIndicator currentStep={step} />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <CompanyStep
            key="step1"
            defaultValues={{
              companyName: formData.companyName,
              companyNumber: formData.companyNumber,
            }}
            onNext={onCompanySubmit}
          />
        )}

        {step === 2 && (
          <PlanStep
            key="step2"
            selectedPlan={currentPlan}
            onSelect={onPlanSelect}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <UserStep
            key="step3"
            defaultValues={{
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              password: formData.password,
            }}
            onNext={onUserSubmit}
            onBack={() => setStep(2)}
            isLoading={isLoading}
          />
        )}

        {step === 4 && (
          <VerificationStep
            key="step4"
            email={formData.email}
            onVerify={handleVerification}
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
