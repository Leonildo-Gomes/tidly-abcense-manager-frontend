"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function ClerkProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <ClerkProvider
      signInFallbackRedirectUrl="/home"
      signUpFallbackRedirectUrl="/home"
      afterSignOutUrl="/"
    >
      {children}
    </ClerkProvider>
  );
}
