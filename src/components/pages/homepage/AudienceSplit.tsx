"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Sparkles,
  Users,
  FileBarChart2,
  UserPlus,
  Trophy,
  Award,
} from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const developerFeatures = [
  { icon: Code2, label: "React, Next.js, TypeScript" },
  { icon: Sparkles, label: "AI-guided feedback" },
  { icon: Trophy, label: "Global leaderboard" },
  { icon: Award, label: "Shareable certificates" },
];

const recruiterFeatures = [
  { icon: Sparkles, label: "AI assessment generator" },
  { icon: FileBarChart2, label: "Candidate skill reports" },
  { icon: UserPlus, label: "One-click candidate invites" },
  { icon: CheckCircle2, label: "Exportable PDF results" },
];

export default function AudienceSplit() {
  return (
    <section className="container-custom py-24">
      {/* Heading */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-2xl text-center"
      >
        <motion.p
        //   variants={item}
          className="font-mono text-sm font-medium tracking-tight text-indigo-600"
        >
          {"One platform, two workflows"}
        </motion.p>
        <motion.h2
        //   variants={item}
          className="mt-1 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl"
        >
          Built for developers{" "}
          <span className="text-slate-400">&amp;</span> hiring teams
        </motion.h2>
        <motion.p  className="mt-5 text-lg text-slate-600">
          The same question bank, viewed from two sides — one to practice
          against, one to hire with.
        </motion.p>
      </motion.div>

      {/* Split panes */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-14 grid gap-6 lg:grid-cols-2 lg:items-stretch"
      >
        {/* Developers — dark editor pane, continues Hero's code motif */}
        <motion.div
        //   variants={item}
          className="flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl shadow-slate-900/10"
        >
          <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-950/60 px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            <span className="ml-3 font-mono text-xs text-slate-400">
              for-developers.tsx
            </span>
          </div>

          <div className="flex flex-1 flex-col px-6 py-7">
            <div className="flex items-center gap-2 text-indigo-400">
              <Code2 className="h-5 w-5" />
              <span className="font-mono text-xs uppercase tracking-wider">
                For Developers
              </span>
            </div>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              Practice on real problems, prove it with real scores.
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Sharpen your frontend skills against structured assessments,
              get inline AI feedback like a senior reviewer, and climb the
              leaderboard while you do it.
            </p>

            <ul className="mt-6 space-y-3">
              {developerFeatures.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2.5 font-mono text-sm text-slate-300"
                >
                  <Icon className="h-4 w-4 shrink-0 text-indigo-400" />
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <Link
                href="/assessments"
                className="group inline-flex items-center gap-2 rounded-md bg-linear-to-tr from-[#3452F3] to-[#442a94] px-6 py-3 font-semibold text-white shadow-sm shadow-indigo-950/40 transition hover:shadow-md hover:shadow-indigo-900/50"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Recruiters — light dashboard pane, mirrors the score-strip from Hero */}
        <motion.div
        //   variants={item}
          className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5"
        >
          <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-5 py-3">
            <Users className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-mono text-xs text-slate-500">
              candidate-report.pdf
            </span>
          </div>

          <div className="flex flex-1 flex-col px-6 py-7">
            <div className="flex items-center gap-2 text-violet-600">
              <Users className="h-5 w-5" />
              <span className="font-mono text-xs uppercase tracking-wider">
                For Recruiters
              </span>
            </div>
            <h3 className="mt-3 text-2xl font-semibold text-slate-900">
              Hire frontend engineers with evidence, not guesswork.
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Spin up an assessment in minutes with AI, or build one by hand
              from our question bank. Every invite comes back as a scored,
              exportable report.
            </p>

            <ul className="mt-6 space-y-3">
              {recruiterFeatures.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2.5 font-mono text-sm text-slate-600"
                >
                  <Icon className="h-4 w-4 shrink-0 text-violet-600" />
                  {label}
                </li>
              ))}
            </ul>

            {/* mini score strip, echoes Hero's test-result strip */}
            <div className="mt-6 flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 font-mono text-xs text-slate-500">
              <span>3 candidates evaluated</span>
              <span className="rounded-full bg-violet-100 px-2.5 py-1 text-violet-700">
                avg. 84% match
              </span>
            </div>

            <div className="mt-auto pt-8">
              <Link
                href="/recruiters/apply"
                className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Apply as Recruiter
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}