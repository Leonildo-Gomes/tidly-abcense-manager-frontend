"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

type VerificationStepProps = {
  email?: string;
  onVerify: (code: string) => Promise<void>;
  isLoading: boolean;
};

export default function VerificationStep({ email, onVerify, isLoading }: VerificationStepProps) {
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify(code);
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-2" />
        <h2 className="text-xl font-bold">Verify Email</h2>
        <p className="text-sm text-gray-500">Code sent to {email}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter verification code"
          className="text-center text-lg tracking-widest"
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Verify & Complete"
          )}
        </Button>
      </form>
    </div>
  );
}
