"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { User, Mail, Lock, CheckCircle2 } from "lucide-react";
import { RegisterFormData, registerSchema } from "@/src/lib/validations/auth";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import Image from "next/image";
import { authApi } from "@/src/lib/api/auth";

const trustPoints = [
  "Benchmark your React, Next.js & TypeScript skills",
  "Get a role-ready assessment report you can share",
  "Track progress with instant, guided feedback",
];

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const password = watch("password");

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;

    const levels = [
      { label: "Very Weak", color: "bg-red-500" },
      { label: "Weak", color: "bg-orange-500" },
      { label: "Fair", color: "bg-yellow-500" },
      { label: "Good", color: "bg-blue-500" },
      { label: "Strong", color: "bg-green-500" },
    ];

    return {
      strength,
      label: levels[strength - 1]?.label || "",
      color: levels[strength - 1]?.color || "bg-gray-300",
    };
  };

  const passwordStrength = getPasswordStrength(password);

  const onSubmit = async (data: RegisterFormData) => {
    setApiError("");
    setIsLoading(true);

    try {
      await authApi.register({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        role: "candidate",
      });

      // Redirect to login with success flag
      router.push("/login?registered=true");
    } catch (error: any) {
      setApiError(error.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 items-stretch gap-3 p-4 md:grid-cols-[46%_50%] md:p-8">
      {/* Left branding panel */}
      <div className="relative hidden overflow-hidden rounded-3xl bg-linear-to-br from-indigo-100 via-violet-500 to-indigo-700 p-10 text-white md:flex md:flex-col md:justify-between">
        {/* decorative glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />

          <div className="relative flex items-center gap-3">
                 <Image
                   src="/logo1.png"
                   alt="FrontendIQ logo"
                   width={60}
                   height={60}
                   className="h-10 w-10 md:h-15 md:w-16 rounded-lg object-cover"
                   priority
                 />
                 <span className="text-lg font-semibold tracking-tight mt-5 -pl-5">FrontendIQ</span>
               </div>

        <div className="relative">
          <h1 className="text-4xl font-bold leading-tight tracking-tight">
            Create your account.
          </h1>
          <p className="mt-3 max-w-sm text-indigo-100">
            Start your frontend assessment journey and see exactly where your
            skills stand today.
          </p>
        </div>

        <ul className="relative space-y-3">
          {trustPoints.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-sm text-indigo-50">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile-only compact header (shown when branding panel is hidden) */}
      <div className="flex flex-col items-center gap-3 md:hidden">
        <Image
          src="/logo1.png"
          alt="FrontendIQ logo"
          width={40}
          height={40}
          className="h-10 w-10 rounded-lg object-cover"
          priority
        />
        <div className="mt-2 mb-2 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="mt-1 text-sm text-gray-600">
            Start your frontend assessment journey
          </p>
        </div>
      </div>

      {/* Right side — form */}
      <div className="flex flex-col justify-center lg:pr-10">
        {apiError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <p className="text-red-800 text-sm font-medium">⚠ {apiError}</p>
          </motion.div>
        )}
   <div className="flex justify-center px-4 md:px-8">
          <div className="w-full max-w-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* No role selection, defaults to candidate */}

          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            icon={<User className="w-5 h-5" />}
            error={errors.fullName?.message}
            disabled={isLoading}
            {...register("fullName")}
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            icon={<Mail className="w-5 h-5" />}
            error={errors.email?.message}
            disabled={isLoading}
            {...register("email")}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Create a strong password"
                icon={<Lock className="w-5 h-5" />}
                error={errors.password?.message}
                helperText="Must contain uppercase, lowercase, number & special character"
                disabled={isLoading}
                {...register("password")}
              />

              {password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          level <= passwordStrength.strength
                            ? passwordStrength.color
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600">
                    Password strength:{" "}
                    <span className="font-semibold">
                      {passwordStrength.label}
                    </span>
                  </p>
                </div>
              )}
            </div>

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              icon={<Lock className="w-5 h-5" />}
              error={errors.confirmPassword?.message}
              disabled={isLoading}
              {...register("confirmPassword")}
            />
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="agreeToTerms"
              {...register("agreeToTerms")}
              disabled={isLoading}
              className="w-4 h-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="agreeToTerms"
              className="text-sm text-gray-700 cursor-pointer"
            >
              I agree to the{" "}
              <Link
                href="/terms"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-sm text-red-500">
              ⚠ {errors.agreeToTerms.message}
            </p>
          )}

          <Button type="submit" loading={isLoading} fullWidth>
            Create Account
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" type="button" disabled={isLoading}>
            <svg width="24px" height="24px" viewBox="0 0 30 30" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><path d="M23.75,16A7.7446,7.7446,0,0,1,8.7177,18.6259L4.2849,22.1721A13.244,13.244,0,0,0,29.25,16" fill="#00ac47"/><path d="M23.75,16a7.7387,7.7387,0,0,1-3.2516,6.2987l4.3824,3.5059A13.2042,13.2042,0,0,0,29.25,16" fill="#4285f4"/><path d="M8.25,16a7.698,7.698,0,0,1,.4677-2.6259L4.2849,9.8279a13.177,13.177,0,0,0,0,12.3442l4.4328-3.5462A7.698,7.698,0,0,1,8.25,16Z" fill="#ffba00"/><polygon fill="#2ab2db" points="8.718 13.374 8.718 13.374 8.718 13.374 8.718 13.374"/><path d="M16,8.25a7.699,7.699,0,0,1,4.558,1.4958l4.06-3.7893A13.2152,13.2152,0,0,0,4.2849,9.8279l4.4328,3.5462A7.756,7.756,0,0,1,16,8.25Z" fill="#ea4435"/><polygon fill="#2ab2db" points="8.718 18.626 8.718 18.626 8.718 18.626 8.718 18.626"/><path d="M29.25,15v1L27,19.5H16.5V14H28.25A1,1,0,0,1,29.25,15Z" fill="#4285f4"/></svg>
            Google
          </Button>
          <Button variant="outline" type="button" disabled={isLoading}>
            <svg width="24px" height="24px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            GitHub
          </Button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Login
          </Link>
        </p>
        <p className="text-center text-sm text-gray-600 mt-2">
          Want to hire developers?{" "}
          <Link
            href="/become-recruiter"
            className="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Become a Recruiter
          </Link>
        </p>
        </div></div>
      </div>
    </div>
  );
}