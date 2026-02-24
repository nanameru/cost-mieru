import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ログイン",
};

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30">
      <SignIn afterSignInUrl="/dashboard" />
    </div>
  );
}
