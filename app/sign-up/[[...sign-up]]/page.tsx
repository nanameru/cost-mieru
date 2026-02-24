import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "アカウント作成",
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30">
      <SignUp afterSignUpUrl="/dashboard" />
    </div>
  );
}
