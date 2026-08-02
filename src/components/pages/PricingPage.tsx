"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  Check,
  ChevronDown,
  Clock,
  MessageCircle,
  ShieldCheck,
  Users,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const plans = [
    {
      name: "Starter",
      description: "Best for small hiring needs",
      price: 0,
      features: [
        "3 assessments per month",
        "Up to 10 candidates",
        "Manual question creation",
        "Basic AI analysis",
        "Email invitations",
      ],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Pro",
      description: "For growing teams",
      price: 49,
      features: [
        "Unlimited assessments",
        "Unlimited candidates",
        "AI question generator",
        "Advanced AI analysis",
        "Detailed assessment reports",
        "Priority support",
      ],
      cta: "Start Pro Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large companies",
      price: 199,
      features: [
        "Everything in Pro",
        "Team management",
        "Multiple recruiter seats",
        "Custom company branding",
        "API access",
        "Dedicated account manager",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  const comparisonRows = [
    {
      feature: "Assessments per month",
      icon: Zap,
      starter: "3",
      pro: "Unlimited",
      enterprise: "Unlimited",
    },
    {
      feature: "Candidates per month",
      icon: Users,
      starter: "10",
      pro: "Unlimited",
      enterprise: "Unlimited",
    },
    {
      feature: "AI Question Generation",
      icon: Zap,
      starter: false,
      pro: true,
      enterprise: true,
    },
    {
      feature: "AI Analysis",
      icon: Zap,
      starter: "Basic",
      pro: "Advanced",
      enterprise: "Advanced",
    },
    {
      feature: "Recruiter Seats",
      icon: Users,
      starter: "1",
      pro: "1",
      enterprise: "Unlimited",
    },
    {
      feature: "Team Management",
      icon: Users,
      starter: false,
      pro: false,
      enterprise: true,
    },
    {
      feature: "Custom Branding",
      icon: Building2,
      starter: false,
      pro: false,
      enterprise: true,
    },
    {
      feature: "API Access",
      icon: Zap,
      starter: false,
      pro: false,
      enterprise: true,
    },
    {
      feature: "Support",
      icon: MessageCircle,
      starter: "Community",
      pro: "Priority",
      enterprise: "Dedicated",
    },
  ];

  const faqs = [
    {
      question: "Do candidates need to pay to take assessments?",
      answer:
        "No, assessments are 100% free for candidates. Pricing is exclusively for recruiters and companies using the platform to hire.",
    },
    {
      question: "Can I use my own questions instead of AI?",
      answer:
        "Yes. The Starter plan allows manual question creation. You can also mix your own questions with AI-generated ones in the Pro plan.",
    },
    {
      question: "Can I upgrade or downgrade my plan later?",
      answer:
        "Absolutely. You can change your plan at any time from your dashboard. Changes are prorated automatically.",
    },
    {
      question: "How does the 10-candidate limit work in Starter?",
      answer:
        "You can invite up to 10 unique candidates per month. Unused invitations do not roll over to the next month.",
    },
    {
      question: "What kind of support do I get in the Enterprise plan?",
      answer:
        "Enterprise customers get a dedicated account manager, priority SLA, custom onboarding, and direct API integration support.",
    },
  ];

  const renderCell = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-50">
          <Check className="w-3.5 h-3.5 text-indigo-600" strokeWidth={2.5} />
        </span>
      ) : (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100">
          <X className="w-3.5 h-3.5 text-slate-400" strokeWidth={2.5} />
        </span>
      );
    }
    return <span className="text-slate-700 text-sm font-medium">{value}</span>;
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="container-custom grid gap-14 py-20  lg:grid-cols-[1.05fr_0.95fr] lg:items-center border-b border-slate-100">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-sm font-medium tracking-tight text-indigo-600 mb-4">
            {"Simple-transparent-pricing"}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-5">
            Pricing that scales
            <br className="hidden sm:block" />
            with your hiring
          </h1>
          <p className="text-lg text-slate-600 max-w-lg mb-3">
            Choose the plan that fits your team. Upgrade or downgrade anytime,
            no long-term contracts.
          </p>
          <p className="text-sm text-slate-500">
            Candidates always take assessments for free — pricing is for
            recruiters only.
          </p>
        </motion.div>

        {/* Quick info panel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-slate-200 p-6 space-y-5"
        >
          <div className="flex items-start gap-3">
            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-50 shrink-0">
              <ShieldCheck className="w-4.5 h-4.5 text-indigo-600" />
            </span>
            <div>
              <p className="text-sm font-medium text-slate-900">
                14-day money-back guarantee
              </p>
              <p className="text-sm text-slate-500">
                Not satisfied? Get a full refund, no questions asked.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-50 shrink-0">
              <Clock className="w-4.5 h-4.5 text-indigo-600" />
            </span>
            <div>
              <p className="text-sm font-medium text-slate-900">
                Cancel anytime
              </p>
              <p className="text-sm text-slate-500">
                No lock-in. Downgrade to Free whenever you like.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-50 shrink-0">
              <Zap className="w-4.5 h-4.5 text-indigo-600" />
            </span>
            <div>
              <p className="text-sm font-medium text-slate-900">
                Free plan available
              </p>
              <p className="text-sm text-slate-500">
                Start hiring with 3 assessments per month, no card required.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="container-custom py-20">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`relative rounded-2xl p-8 transition-all ${
                plan.popular
                  ? "border-2 border-indigo-600 shadow-xl shadow-indigo-100 md:-translate-y-2"
                  : "border border-slate-200 hover:border-slate-300"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                  Most Popular
                </span>
              )}

              <h3 className="text-lg font-semibold text-slate-900">
                {plan.name}
              </h3>
              <p className="text-sm text-slate-500 mt-1 mb-6">
                {plan.description}
              </p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold text-slate-900 tracking-tight">
                  ${plan.price}
                </span>
                {plan.price > 0 && (
                  <span className="text-sm text-slate-500">/month</span>
                )}
              </div>

              <Link
                href={plan.name === "Enterprise" ? "/contact" : "/register"}
                className={`block w-full py-3 rounded-lg font-medium text-sm text-center transition-colors mb-8 ${
                  plan.popular
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {plan.cta}
              </Link>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0"
                      strokeWidth={2.5}
                    />
                    <span className="text-sm text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">
              Compare plans
            </h2>
            <p className="text-slate-600">
              See exactly what's included in each tier
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Feature
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Starter
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-indigo-600 uppercase tracking-wide bg-indigo-50/60">
                      Pro
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonRows.map((row) => (
                    <tr
                      key={row.feature}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">
                        <span className="flex items-center gap-2">
                          <row.icon className="w-4 h-4 text-slate-400" />
                          {row.feature}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderCell(row.starter)}
                      </td>
                      <td className="px-6 py-4 text-center bg-indigo-50/40">
                        {renderCell(row.pro)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderCell(row.enterprise)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="container-custom py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">
              Frequently asked questions
            </h2>
            <p className="text-slate-600">
              Everything you need to know about our pricing
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.question}
                  className="border border-slate-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-sm font-medium text-slate-900">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-custom py-20">
        <div className="text-center rounded-3xl bg-slate-900 px-8 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Ready to streamline your hiring?
          </h2>
          <p className="text-slate-300 mb-8 max-w-md mx-auto">
            Join hiring teams using FrontendIQ to evaluate frontend talent
            faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/register"
              className="px-6 py-3 rounded-lg bg-white text-slate-900 font-medium text-sm hover:bg-slate-100 transition-colors"
            >
              Start Free Trial
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-lg border border-slate-700 text-white font-medium text-sm hover:bg-slate-800 transition-colors"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
