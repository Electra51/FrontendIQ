"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Mail, User, Briefcase, ChevronRight, CheckCircle2, Globe, Phone, MapPin, AlignLeft, HomeIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";

const recruiterRequestSchema = z.object({
  companyName: z.string().min(2, "Company Name is required"),
  companyWebsite: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  fullName: z.string().min(2, "Full Name is required"),
  businessEmail: z.string().email("Valid business email is required"),
  phone: z.string().optional(),
  linkedIn: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  companySize: z.string().optional(),
  designation: z.string().optional(),
  reason: z.string().optional(),
  country: z.string().optional(),
});

type RecruiterRequestData = z.infer<typeof recruiterRequestSchema>;

const trustPoints = [
  "AI Question Generation: Automate technical screening",
  "Secure Invites: Prevent cheating with one-time tokens",
  "Automated Analysis: Get detailed skill reports",
];

export default function BecomeRecruiterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecruiterRequestData>({
    resolver: zodResolver(recruiterRequestSchema),
  });

  const onSubmit = async (data: RecruiterRequestData) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (error) {
      Swal.fire("Error", "Failed to submit request. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 items-stretch gap-3 p-4 md:grid-cols-[46%_50%] md:p-8 bg-white">
      {/* Left branding panel */}
      <div className="relative hidden overflow-hidden rounded-3xl bg-linear-to-br from-indigo-100 via-violet-500 to-indigo-700 p-10 text-white md:flex md:flex-col md:justify-between">
        {/* decorative glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />

        <div className="relative flex items-center gap-3">
          <Link href="/">
            <Image
              src="/logo1.png"
              alt="FrontendIQ logo"
              width={60}
              height={60}
              className="h-10 w-10 md:h-15 md:w-16 rounded-lg object-cover cursor-pointer"
              priority
            />
          </Link>
          <span className="text-lg font-semibold tracking-tight mt-5 -pl-5">FrontendIQ</span>
        </div>

        <div className="relative">
          <h1 className="text-4xl font-bold leading-tight tracking-tight">
            Hire Top Frontend Talent.
          </h1>
          <p className="mt-3 max-w-sm text-indigo-100">
            Get access to our AI-powered assessment tools. Automate technical screening and identify the best developers in minutes.
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
        <Link href="/">
          <Image
            src="/logo1.png"
            alt="FrontendIQ logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-lg object-cover cursor-pointer"
            priority
          />
        </Link>
        <div className="mt-2 mb-2 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Become a Recruiter</h1>
          <p className="mt-1 text-sm text-gray-600">
            Automate technical screening
          </p>
        </div>
      </div>

      {/* Right side — form */}
      <div className="flex flex-col justify-center lg:pr-10">
        <div className="flex justify-center px-4 md:px-8">
          <div className="w-full max-w-lg">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Application Received!</h3>
                <p className="text-gray-500">
                  Thank you for your interest. Our admin team will review your application and send you an email with login instructions shortly.
                </p>
                <div className="pt-6">
                  <Link href="/">
                    <Button variant="outline" fullWidth>Return Home</Button>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <>
                <div className="mb-6 hidden md:block">
                  <h3 className="text-2xl font-bold text-gray-900">Recruiter Application Form</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Please fill out the details below to request recruiter access.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
                    <Input
                      label="Company Name *"
                      placeholder="Acme Corp"
                      icon={<Building2 className="w-5 h-5" />}
                      {...register("companyName")}
                      error={errors.companyName?.message}
                    />
                    <Input
                      label="Company Website"
                      placeholder="https://acmecorp.com"
                      icon={<Globe className="w-5 h-5" />}
                      {...register("companyWebsite")}
                      error={errors.companyWebsite?.message}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
                    <Input
                      label="Full Name *"
                      placeholder="Jane Doe"
                      icon={<User className="w-5 h-5" />}
                      {...register("fullName")}
                      error={errors.fullName?.message}
                    />
                    <Input
                      label="Business Email *"
                      type="email"
                      placeholder="jane@acmecorp.com"
                      icon={<Mail className="w-5 h-5" />}
                      {...register("businessEmail")}
                      error={errors.businessEmail?.message}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
                    <Input
                      label="Phone"
                      placeholder="+1 234 567 890"
                      icon={<Phone className="w-5 h-5" />}
                      {...register("phone")}
                    />
                    <Input
                      label="LinkedIn Profile"
                      placeholder="https://linkedin.com/in/jane"
                      icon={<HomeIcon className="w-5 h-5" />}
                      {...register("linkedIn")}
                      error={errors.linkedIn?.message}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Briefcase className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                          {...register("companySize")}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                          <option value="">Select size</option>
                          <option value="1-10">1 - 10 employees</option>
                          <option value="11-50">11 - 50 employees</option>
                          <option value="51-200">51 - 200 employees</option>
                          <option value="201-500">201 - 500 employees</option>
                          <option value="500+">500+ employees</option>
                        </select>
                      </div>
                    </div>
                    
                    <Input
                      label="Designation"
                      placeholder="e.g. HR Manager, CTO"
                      icon={<User className="w-5 h-5" />}
                      {...register("designation")}
                    />
                  </div>

                  <div className="grid grid-cols-1">
                    <Input
                      label="Country"
                      placeholder="e.g. United States, Bangladesh"
                      icon={<MapPin className="w-5 h-5" />}
                      {...register("country")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reason for joining</label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <AlignLeft className="h-5 w-5 text-gray-400" />
                      </div>
                      <textarea
                        {...register("reason")}
                        rows={2}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                        placeholder="Tell us briefly how you plan to use FrontendIQ..."
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button type="submit" loading={isSubmitting} fullWidth className="flex justify-center items-center gap-2">
                      Submit Application
                    </Button>
                  </div>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                  Are you a candidate?{" "}
                  <Link
                    href="/register"
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Register here
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
