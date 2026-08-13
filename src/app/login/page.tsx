import { Suspense } from "react";
import Link from "next/link";
import { Truck } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";
import { LoginHero } from "@/components/auth/login-hero";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-1">
      <LoginHero />
      <div className="flex flex-1 flex-col items-center justify-center bg-muted/40 px-4 py-10 sm:px-6">
        <div className="w-full max-w-sm animate-fade-up">
          <Link href="/" className="mb-8 flex items-center justify-center gap-2 lg:hidden">
            <span className="flex size-8 items-center justify-center rounded-[var(--radius-element)] bg-primary text-primary-foreground">
              <Truck size={18} aria-hidden="true" />
            </span>
            <span className="font-heading text-lg font-semibold">LogiSight</span>
          </Link>

          <div className="rounded-[var(--radius-card)] border border-border bg-card p-6 shadow-md sm:p-8">
            <div className="flex flex-col gap-1 text-center">
              <h1 className="font-heading text-xl font-semibold">Sign in</h1>
              <p className="text-sm text-muted-foreground">
                Track and manage your parcels across Kenya.
              </p>
            </div>

            <div className="mt-6">
              <Suspense>
                <LoginForm />
              </Suspense>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
