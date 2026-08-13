"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth/auth-context";
import { homeForRole } from "@/lib/auth/roles";
import { loginSchema, type LoginValues } from "@/lib/auth/schemas";
import type { Role } from "@/types/models";

const QUICK_LOGIN_ROLES: Role[] = ["SENDER", "DRIVER", "PICKUP", "ADMIN"];

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [quickLoginRole, setQuickLoginRole] = useState<Role | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  async function handleSuccess(role: Role, name: string) {
    toast.success(`Welcome back, ${name}!`);
    const returnUrl = searchParams.get("returnUrl");
    const isSafeReturnUrl =
      !!returnUrl && returnUrl.startsWith("/") && !returnUrl.startsWith("//") && !returnUrl.startsWith("/\\");
    router.push(isSafeReturnUrl ? returnUrl : homeForRole(role));
  }

  async function onSubmit(values: LoginValues) {
    try {
      const user = await login(values.email, "SENDER");
      await handleSuccess(user.role, user.name);
    } catch {
      toast.error("Login failed. Please try again.");
    }
  }

  async function onQuickLogin(role: Role) {
    setQuickLoginRole(role);
    try {
      const user = await login(`${role.toLowerCase()}@logisight.co.ke`, role);
      await handleSuccess(user.role, user.name);
    } catch {
      toast.error("Quick login failed.");
    } finally {
      setQuickLoginRole(null);
    }
  }

  const busy = isSubmitting || quickLoginRole !== null;

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>
        <Button type="submit" disabled={busy} className="mt-2 h-9">
          {isSubmitting && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
          Sign in
        </Button>
      </form>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        Quick demo login
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {QUICK_LOGIN_ROLES.map((role) => (
          <Button
            key={role}
            type="button"
            variant="outline"
            disabled={busy}
            onClick={() => onQuickLogin(role)}
            className="h-9"
          >
            {quickLoginRole === role && (
              <Loader2 size={14} className="animate-spin" aria-hidden="true" />
            )}
            {role.charAt(0) + role.slice(1).toLowerCase()}
          </Button>
        ))}
      </div>
    </div>
  );
}
