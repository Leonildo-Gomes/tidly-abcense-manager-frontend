import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tidly",
  description: "Tidly - Absence Management System",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <ClerkProvider>
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <Toaster position="top-right" richColors />
            {children}
        </body>
        </html>
     </ClerkProvider>
  )
}