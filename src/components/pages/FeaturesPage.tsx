"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Brain,
  Briefcase,
  Building2,
  Check,
  CheckCircle2,
  ClipboardList,
  Clock,
  Code2,
  FileQuestion,
  GraduationCap,
  KeyRound,
  LayoutDashboard,
  Link2,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  Workflow,
  X,
} from "lucide-react";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Content — mirrors the actual candidate → recruiter pipeline, in order.
// The numbering below is real: this is the sequence an assessment moves
// through, not a decorative 01/02/03.
// ---------------------------------------------------------------------------

const pipeline = [
  {
    number: "01",
    id: "creation",
    icon: ClipboardList,
    title: "Assessment Creation",
    summary: "Build the assessment",
    description:
      "Write questions yourself or generate them with AI. Either way, you stay in control of what candidates see.",
    features: [
      "Create assessments manually",
      "AI question generation",
      "Admin-managed topic selection",
      "Difficulty selection",
      "Question bank reuse",
    ],
  },
  {
    number: "02",
    id: "workflow",
    icon: Workflow,
    title: "Recruiter Approval",
    summary: "Move candidates through your pipeline",
    description:
      "Approve, invite, and schedule without spreadsheets. Every candidate's status is visible in one place.",
    features: [
      "Recruiter approval process",
      "Candidate invitation links",
      "Assessment scheduling",
      "Candidate tracking",
    ],
  },
  {
    number: "03",
    id: "experience",
    icon: LayoutDashboard,
    title: "Candidate Experience",
    summary: "A focused space to take the test",
    description:
      "Candidates get a clean registration flow and a dashboard that keeps them oriented from start to submission.",
    features: ["Invitation Link", "Register", "Assessment", "Submit"],
  },
  {
    number: "04",
    id: "evaluation",
    icon: Brain,
    title: "AI Evaluation",
    summary: "Score beyond right or wrong",
    description:
      "Submissions are broken down by topic, so you see where a candidate is strong and where they need support.",
    features: [
      "Topic-wise analysis",
      "Strength & weakness detection",
      "Personalized recommendations",
      "Performance summary",
    ],
  },
  {
    number: "05",
    id: "security",
    icon: ShieldCheck,
    title: "Security",
    summary: "Protect every link and record",
    description:
      "Access is authenticated and scoped by role, and invitation links can only ever be used once.",
    features: [
      "JWT authentication",
      "Role-based access",
      "One-time invitation links",
      "Email verification",
    ],
  },
  {
    number: "06",
    id: "analytics",
    icon: BarChart3,
    title: "Analytics",
    summary: "Read the results at a glance",
    description:
      "A recruiter dashboard that surfaces candidate performance and completion trends without extra tooling.",
    features: [
      "Candidate Reports",
      "Assessment Completion",
      "Average Score",
      "Download PDF",
    ],
  },
];

const securityBadges = [
  { icon: KeyRound, label: "JWT Authentication" },
  { icon: UserCheck, label: "Role-based Access" },
  { icon: Link2, label: "One-time Invitation Links" },
  { icon: Mail, label: "Email Verification" },
];

// Who the platform is built for. Swap for real customer logos once available.
const usedBy = [
  { icon: Briefcase, label: "Recruiters" },
  { icon: GraduationCap, label: "Bootcamps" },
  { icon: Building2, label: "Universities" },
  { icon: Users, label: "Hiring Teams" },
];

// NOTE: placeholder numbers for now — replace with real product metrics
// once you have them, don't ship these to production as-is.
const stats = [
  { value: "120+", label: "Assessments" },
  { value: "350+", label: "Candidates" },
  { value: "96%", label: "Completion Rate" },
];

const roadmap = [
  { icon: Code2, label: "In-browser live code editor" },
  { icon: Users, label: "Team management & collaboration" },
];

export default function FeaturesPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = pipeline[activeIndex];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="container-custom grid gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-3xl mr-auto text-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p className="font-mono text-sm font-medium tracking-tight text-indigo-600">
              {"Built-for-hiring-teams"}
            </motion.p>
            <h1 className="text-4xl md:text-[45px] font-bold text-slate-900 tracking-tight mb-6">
              One pipeline, from question
              <br className="hidden sm:block" />
              to hiring decision
            </h1>

            <p className="text-lg text-slate-700 max-w-xl mr-auto">
              FrontendIQ takes an assessment from creation to a scored, analyzed
              report — so your team spends time deciding, not chasing status
              updates.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-start gap-4"
            >
              <button className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
                Become a Recruiter
              </button>
              <button className="px-6 py-3 rounded-lg border border-slate-200 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors">
                View Pricing
              </button>
            </motion.div>

            {/* Feature Checklist */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-8 flex flex-wrap items-center justify-start gap-x-6 gap-y-2 text-sm text-slate-600"
            >
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-indigo-600" strokeWidth={2.5} />
                AI Question Generation
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-indigo-600" strokeWidth={2.5} />
                One-time Candidate Invites
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-indigo-600" strokeWidth={2.5} />
                AI Performance Reports
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Assessment Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* soft background glow */}
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-indigo-100/60 blur-2xl" />

          <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 overflow-hidden">
            {/* Card header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
              <span className="text-xs font-mono font-medium text-indigo-600 tracking-tight">
                React Assessment
              </span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700">
                Intermediate
              </span>
            </div>

            {/* Card body */}
            {/* Card body */}
            <div className="px-6 py-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Frontend Fundamentals
              </h3>

              <div className="flex items-center gap-4 mb-6 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <FileQuestion className="w-4 h-4" />
                  20 Questions
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  30 Minutes
                </span>
              </div>

              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                Topics
              </p>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 mb-6">
                <span className="flex items-center gap-1.5 text-sm text-slate-700">
                  <Check
                    className="w-3.5 h-3.5 text-indigo-600"
                    strokeWidth={2.5}
                  />
                  React Hooks
                </span>
                <span className="flex items-center gap-1.5 text-sm text-slate-700">
                  <Check
                    className="w-3.5 h-3.5 text-indigo-600"
                    strokeWidth={2.5}
                  />
                  API Integration
                </span>
                <span className="flex items-center gap-1.5 text-sm text-slate-700">
                  <Check
                    className="w-3.5 h-3.5 text-indigo-600"
                    strokeWidth={2.5}
                  />
                  State Management
                </span>
                <span className="flex items-center gap-1.5 text-sm text-slate-700">
                  <Check
                    className="w-3.5 h-3.5 text-indigo-600"
                    strokeWidth={2.5}
                  />
                  Performance
                </span>
              </div>

              <div className="h-px bg-slate-100 mb-4" />

              {/* Invite Only lock badge */}
              <div className="flex items-center justify-center gap-1.5 mb-3 text-sm font-medium text-slate-500">
                <Lock className="w-3.5 h-3.5" />
                Invite Only
              </div>

              <button className="w-full py-3 rounded-lg border border-slate-200 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors">
                Preview Assessment
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Pipeline — signature section */}
      <section className="py-20 px-4 bg-white">
        <div className="container-custom">
          <div className="text-start mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
              How an assessment moves through FrontendIQ
            </h2>
            <p className="text-slate-600">
              Six stages. Select one to see what it does.
            </p>
          </div>

          {/* Stepper */}
          <div className="relative mb-12">
            <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-slate-200" />
            <div className="grid grid-cols-2 md:grid-cols-6 gap-y-6 gap-x-2 relative">
              {pipeline.map((stage, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveIndex(i)}
                    className="group flex flex-col items-center text-center focus:outline-none"
                  >
                    <span
                      className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-indigo-600 border-indigo-600 text-white"
                          : "bg-white border-slate-200 text-slate-400 group-hover:border-indigo-300 group-hover:text-indigo-600"
                      }`}
                    >
                      {stage.number}
                    </span>
                    <span
                      className={`mt-3 text-sm font-medium transition-colors ${
                        isActive
                          ? "text-slate-900"
                          : "text-slate-500 group-hover:text-slate-700"
                      }`}
                    >
                      {stage.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active stage detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-8 md:p-10"
            >
              <div className="grid md:grid-cols-2 gap-10 items-start">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center mb-5">
                    <active.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">
                    Stage {active.number} · {active.summary}
                  </p>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {active.title}
                  </h3>
                  <p className="text-slate-600">{active.description}</p>
                </div>
                <ul className="space-y-3">
                  {active.features.map((item) => (
                    <li key={item} className="flex items-start text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 mr-3 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      {/* AI Features Highlight */}
      <section className="py-20 px-4 bg-linear-to-br from-blue-600 to-purple-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
              Powered by Advanced AI
            </h2>
            <p className=" text-blue-100 max-w-3xl mr-auto">
              Our AI engine generates intelligent questions, analyzes candidate
              performance, and provides insights that go beyond simple scoring.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                AI Question Generator
              </h3>
              <p className="text-blue-100 mb-6">
                Create customized assessments tailored to specific topics and
                difficulty levels in seconds.
              </p>
              <ul className="space-y-3">
                {[
                  "Topic-specific question generation",
                  "Automatic difficulty adjustment",
                  "Multiple question formats",
                  "Instant generation & preview",
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-white">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                AI-Powered Evaluation
              </h3>
              <p className="text-blue-100 mb-6">
                Get comprehensive feedback on candidate performance with
                detailed topic-wise analysis.
              </p>
              <ul className="space-y-3">
                {[
                  "Topic-wise performance breakdown",
                  "Strength & weakness identification",
                  "Personalized learning recommendations",
                  "Comprehensive performance summary",
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-white">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-start mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose FrontendIQ?
            </h2>
            <p className="text-xl text-gray-600">
              See how we compare to traditional assessment methods
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Traditional Methods
              </h3>
              <ul className="space-y-4">
                {[
                  "Manual question creation",
                  "Generic feedback",
                  "Limited analytics",
                  "Time-consuming evaluation",
                  "One-size-fits-all approach",
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-gray-600">
                    <X className="w-6 h-6 text-red-500 mr-3 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-linear-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-500"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                FrontendIQ
              </h3>
              <ul className="space-y-4">
                {[
                  "AI-powered question generation",
                  "Personalized detailed feedback",
                  "Comprehensive analytics dashboard",
                  "Instant AI evaluation",
                  "Customized assessment paths",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start text-gray-900 font-medium"
                  >
                    <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security — dedicated trust section */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="container-custom grid grid-cols-2 md:grid-cols-[1.05fr_0.95fr] gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-start mb-12"
          >
            <div className="inline-flex items-center gap-2 py-1 text-indigo-300 rounded-full text-xs font-semibold tracking-wide uppercase mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Security
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Candidate data and assessment links, protected by default
            </h2>
            <p className="text-slate-400 max-w-xl mr-auto">
              No shared links, no unverified accounts, no unscoped access.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {securityBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex flex-col items-center text-center gap-3 bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <badge.icon className="w-6 h-6 text-indigo-400" />
                <span className="text-sm text-slate-200 font-medium">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Used by + stats */}
      <section className="py-16 px-4 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wide mb-8">
              Used by
            </p>
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 mb-14">
              {usedBy.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-slate-600"
                >
                  <item.icon className="w-5 h-5 text-indigo-500" />
                  <span className="font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6 border-t border-slate-200 pt-10">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
