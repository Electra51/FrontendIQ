// "use client";

import HowItworksPage from "@/src/components/pages/HowItworksPage";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ArrowRight,
//   BrainCircuit,
//   CheckCircle2,
//   ChevronDown,
//   ClipboardList,
//   Clock,
//   Code2,
//   Copy,
//   FileBarChart2,
//   FileCheck2,
//   LayoutDashboard,
//   ListChecks,
//   Mail,
//   Send,
//   ShieldCheck,
//   Sparkles,
//   Terminal,
//   TrendingUp,
//   UploadCloud,
//   UserPlus,
//   Wand2,
//   XCircle,
//   Check
// } from "lucide-react";
// import Link from "next/link";
// import { Button } from "../../../components/ui/Button";

// /* ------------------------------------------------------------------ */
// /* Data Arrays                                                        */
// /* ------------------------------------------------------------------ */

// const workflowSteps = [
//   {
//     id: 0,
//     eyebrow: "01",
//     icon: UserPlus,
//     label: "Recruiter Request",
//     title: "Request access as a recruiter",
//     description:
//       "Hiring teams don't get a self-serve signup form. Every recruiter account starts as an application, ensuring only legitimate hiring teams have access.",
//     bullets: [
//       "Submit company, role and hiring volume",
//       "Work email verified automatically",
//       "Application enters the admin review queue",
//     ],
//     mockup: "request",
//   },
//   {
//     id: 1,
//     eyebrow: "02",
//     icon: ShieldCheck,
//     label: "Admin Approval",
//     title: "An admin reviews every application",
//     description:
//       "No recruiter goes live without a human check. Admins approve or reject from a single queue, keeping the platform closed to anyone who isn't actually hiring.",
//     bullets: [
//       "One queue for every pending recruiter",
//       "Approve, reject, or request more detail",
//       "Decision emailed to the applicant instantly",
//     ],
//     mockup: "approval",
//   },
//   {
//     id: 2,
//     eyebrow: "03",
//     icon: ClipboardList,
//     label: "Assessment Creation",
//     title: "Build an assessment from expert topics",
//     description:
//       "Recruiters pick from a topic library maintained by admins, then fill it out by writing questions themselves or letting FrontendIQ generate a first draft.",
//     bullets: [
//       "Choose topics: React, CSS layout, JS algorithms",
//       "Write questions manually, or generate with AI",
//       "Set difficulty, time limit and passing threshold",
//     ],
//     mockup: "assessment",
//   },
//   {
//     id: 3,
//     eyebrow: "04",
//     icon: Send,
//     label: "Candidate Invitation",
//     title: "Invite candidates securely",
//     description:
//       "There's no public sign-up. Candidates only exist on the platform because a recruiter invited them, and each link can only be used once.",
//     bullets: [
//       "Single-use, expiring invitation links",
//       "Branded email sent on the recruiter's behalf",
//       "Track sent, opened and started in real time",
//     ],
//     mockup: "invitation",
//   },
//   {
//     id: 4,
//     eyebrow: "05",
//     icon: BrainCircuit,
//     label: "AI Evaluation",
//     title: "AI analyzes the submission in depth",
//     description:
//       "The moment a candidate submits, the assessment engine scores code quality, performance, accessibility and problem-solving — not just whether the output rendered.",
//     bullets: [
//       "Static analysis plus rendered-output comparison",
//       "Scored across five weighted rubric categories",
//       "Flags plagiarism and unusual submission patterns",
//     ],
//     mockup: "evaluation",
//   },
//   {
//     id: 5,
//     eyebrow: "06",
//     icon: FileBarChart2,
//     label: "Hiring Report",
//     title: "Actionable reports, not just raw scores",
//     description:
//       "Every submission becomes a readable report with a skill breakdown, code excerpts worth discussing, and a clear recommendation the whole hiring team can act on.",
//     bullets: [
//       "Skill-by-skill breakdown with evidence",
//       "Shareable with the wider hiring panel",
//       "One click to advance, hold, or reject",
//     ],
//     mockup: "report",
//   },
// ];

// const candidateJourney = [
//   {
//     icon: Mail,
//     label: "Invitation email",
//     note: "Arrives from recruiter",
//   },
//   {
//     icon: UserPlus,
//     label: "Registration",
//     note: "Unlocked by token",
//   },
//   {
//     icon: LayoutDashboard,
//     label: "Dashboard",
//     note: "View assigned tasks",
//   },
//   {
//     icon: ListChecks,
//     label: "Assessment",
//     note: "In-browser code editor",
//   },
//   {
//     icon: UploadCloud,
//     label: "Submission",
//     note: "Locked automatically",
//   },
//   {
//     icon: FileCheck2,
//     label: "AI report",
//     note: "Generated instantly",
//   },
// ];

// const recruiterJourney = [
//   {
//     icon: UserPlus,
//     label: "Recruiter request",
//     note: "Submit company details",
//   },
//   {
//     icon: ShieldCheck,
//     label: "Approval",
//     note: "Admin provisions access",
//   },
//   {
//     icon: LayoutDashboard,
//     label: "Dashboard",
//     note: "Manage everything",
//   },
//   {
//     icon: ClipboardList,
//     label: "Create assessment",
//     note: "AI or manual questions",
//   },
//   {
//     icon: Send,
//     label: "Invite candidate",
//     note: "Secure one-time link",
//   },
//   {
//     icon: FileBarChart2,
//     label: "Review reports",
//     note: "Make hiring decisions",
//   },
// ];

// const faqs = [
//   {
//     q: "Who can become a recruiter on FrontendIQ?",
//     a: "Anyone hiring frontend developers can apply, but access isn't automatic. Every application is reviewed by an admin before the account is activated, ensuring the platform stays limited to real hiring teams.",
//   },
//   {
//     q: "Can candidates sign up without an invitation?",
//     a: "No. Public registration is disabled for candidates. An account only gets created after a recruiter sends a secure, single-use invitation link tied to a specific assessment.",
//   },
//   {
//     q: "Do I have to write every question myself?",
//     a: "No. You can write questions manually, generate them with AI from your chosen topics, or mix both in the same assessment. Every AI-generated question is editable before it goes live.",
//   },
//   {
//     q: "What does the AI actually evaluate?",
//     a: "Submitted code is checked against a rubric covering correctness, code quality, performance, and accessibility, alongside the rendered output. The report shows the reasoning behind each score, not just a number.",
//   },
//   {
//     q: "Can more than one person review a report?",
//     a: "Yes. Reports are shareable with the rest of your hiring panel, so a hiring manager or team lead can weigh in without needing their own recruiter account.",
//   },
//   {
//     q: "What happens if I reject a candidate's submission?",
//     a: "The candidate's status updates immediately and the assessment link is closed. Nothing is sent to the candidate automatically — the recruiter stays in control of that communication.",
//   },
// ];

// /* ------------------------------------------------------------------ */
// /* Sub Components                                                     */
// /* ------------------------------------------------------------------ */

// const ConsoleFrame = ({ tab, children }: { tab: string; children: React.ReactNode }) => (
//   <div className="bg-[#0c0d18] border border-gray-800/60 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full w-full">
//     <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800/60 bg-[#121321]">
//       <div className="flex gap-2">
//         <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
//         <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
//         <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
//       </div>
//       <div className="flex items-center gap-2 font-mono text-[11px] text-gray-400">
//         <Terminal size={14} className="text-gray-500" />
//         <span>{tab}</span>
//       </div>
//       <div className="w-10" />
//     </div>
//     <div className="p-6 sm:p-8 flex-1 bg-gradient-to-b from-[#121321] to-[#0c0d18] relative">
//       {children}
//     </div>
//   </div>
// );

// const StepMockup = ({ type }: { type: string }) => {
//   switch (type) {
//     case "request":
//       return (
//         <ConsoleFrame tab="recruiter/application">
//           <div className="space-y-6">
//             <div className="space-y-1">
//               <div className="font-mono text-xs text-indigo-300">Company Name</div>
//               <div className="text-white text-sm font-medium">Acme Corp</div>
//             </div>
//             <div className="space-y-1">
//               <div className="font-mono text-xs text-indigo-300">Hiring Role</div>
//               <div className="text-white text-sm font-medium">Senior Frontend Engineer</div>
//             </div>
//             <div className="space-y-1">
//               <div className="font-mono text-xs text-indigo-300">Monthly Volume</div>
//               <div className="text-white text-sm font-medium">10 - 20 candidates</div>
//             </div>
//             <div className="pt-4 mt-2 border-t border-gray-800 flex items-center justify-between">
//               <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
//                 <Clock size={12} /> Pending Review
//               </span>
//               <span className="font-mono text-[10px] text-gray-500">submitted 2m ago</span>
//             </div>
//           </div>
//         </ConsoleFrame>
//       );
//     case "approval":
//       return (
//         <ConsoleFrame tab="admin/queue">
//           <div className="space-y-3">
//             {[
//               { name: "S. Lee", co: "Acme Corp", status: "review" },
//               { name: "A. Patel", co: "TechFlow", status: "approved" },
//               { name: "J. Doe", co: "Innovate Ltd", status: "review" },
//             ].map((r, i) => (
//               <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50 border border-gray-800">
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 rounded bg-indigo-900/50 text-indigo-300 flex items-center justify-center font-bold text-sm">
//                     {r.name.charAt(0)}
//                   </div>
//                   <div>
//                     <div className="text-sm font-medium text-white">{r.name}</div>
//                     <div className="text-xs text-gray-400 font-mono">{r.co}</div>
//                   </div>
//                 </div>
//                 {r.status === "approved" ? (
//                   <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium">
//                     <Check size={14} /> Approved
//                   </span>
//                 ) : (
//                   <div className="flex gap-2">
//                     <button className="w-7 h-7 rounded bg-gray-800 text-emerald-400 flex items-center justify-center hover:bg-gray-700 transition-colors">
//                       <Check size={14} />
//                     </button>
//                     <button className="w-7 h-7 rounded bg-gray-800 text-red-400 flex items-center justify-center hover:bg-gray-700 transition-colors">
//                       <XCircle size={14} />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </ConsoleFrame>
//       );
//     case "assessment":
//       return (
//         <ConsoleFrame tab="assessment/new">
//           <div className="space-y-5">
//             <div className="flex flex-wrap gap-2">
//               {["React", "CSS Layout", "Algorithms", "A11y"].map((t, i) => (
//                 <span
//                   key={t}
//                   className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
//                     i < 2
//                       ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/20"
//                       : "bg-gray-900 text-gray-400 border-gray-800"
//                   }`}
//                 >
//                   {t}
//                 </span>
//               ))}
//             </div>
//             <div className="flex items-center gap-3 text-xs text-gray-400">
//               <span>Manual Entry</span>
//               <div className="w-8 h-4 rounded-full bg-indigo-500/30 flex items-center p-0.5 justify-end">
//                 <div className="w-3 h-3 rounded-full bg-indigo-400 shadow-sm" />
//               </div>
//               <span className="text-indigo-300 font-medium flex items-center gap-1">
//                 <Wand2 size={12} /> AI-Generated
//               </span>
//             </div>
//             <div className="p-4 rounded-xl bg-gray-900 border border-indigo-500/20 shadow-inner">
//               <div className="flex items-center gap-2 text-indigo-300 text-xs font-medium mb-3">
//                 <Sparkles size={14} /> <span>Generated Question</span>
//               </div>
//               <p className="text-sm text-gray-200 leading-relaxed mb-4">
//                 "Build a responsive pricing card component that seamlessly reflows from 3 columns to 1 without media-query duplication."
//               </p>
//               <div className="text-[10px] text-gray-500 font-mono">
//                 difficulty: intermediate · est. 25 min
//               </div>
//             </div>
//           </div>
//         </ConsoleFrame>
//       );
//     case "invitation":
//       return (
//         <ConsoleFrame tab="candidates/invite">
//           <div className="space-y-5">
//             <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 space-y-2">
//               <div className="text-[11px] text-gray-400 font-mono">to: alex.smith@example.com</div>
//               <div className="text-sm font-medium text-white">
//                 You're invited: Senior Frontend Engineer assessment
//               </div>
//               <div className="text-[11px] text-gray-500 font-mono">
//                 from Acme Corp via FrontendIQ
//               </div>
//             </div>
//             <div className="flex items-center justify-between p-3 rounded-lg bg-gray-950 border border-gray-800">
//               <span className="text-xs text-indigo-300 font-mono truncate mr-3">
//                 frontendiq.app/i/8f2a-91c...
//               </span>
//               <button className="text-gray-400 hover:text-white transition-colors">
//                 <Copy size={14} />
//               </button>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
//                 Single-use Token
//               </span>
//               <span className="text-[10px] text-gray-500 font-mono">expires in 48 hours</span>
//             </div>
//           </div>
//         </ConsoleFrame>
//       );
//     case "evaluation":
//       return (
//         <ConsoleFrame tab="engine/evaluating">
//           <div className="space-y-6">
//             <div className="relative">
//               <div className="text-xs text-indigo-400 font-mono mb-2">// Analyzing submission structure</div>
//               <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden relative">
//                 <motion.div
//                   className="absolute top-0 bottom-0 bg-indigo-500 rounded-full"
//                   initial={{ left: "-30%", width: "30%" }}
//                   animate={{ left: "100%" }}
//                   transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
//                 />
//               </div>
//             </div>
//             <div className="space-y-3">
//               {[
//                 { label: "Code Quality", val: 92, color: "bg-indigo-500" },
//                 { label: "Performance", val: 85, color: "bg-violet-500" },
//                 { label: "Accessibility", val: 98, color: "bg-emerald-500" },
//               ].map((metric) => (
//                 <div key={metric.label}>
//                   <div className="flex justify-between text-xs mb-1.5">
//                     <span className="text-gray-300">{metric.label}</span>
//                     <span className="text-white font-mono">{metric.val}%</span>
//                   </div>
//                   <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
//                     <motion.div
//                       className={`h-full ${metric.color} rounded-full`}
//                       initial={{ width: 0 }}
//                       whileInView={{ width: `${metric.val}%` }}
//                       transition={{ duration: 1, ease: "easeOut" }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </ConsoleFrame>
//       );
//     default: // report
//       return (
//         <ConsoleFrame tab="reports/alex-smith">
//           <div className="space-y-6">
//             <div className="flex items-center gap-5">
//               <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
//                 <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
//                   <circle cx="32" cy="32" r="28" fill="none" stroke="#1f2937" strokeWidth="6" />
//                   <circle
//                     cx="32"
//                     cy="32"
//                     r="28"
//                     fill="none"
//                     stroke="#6366f1"
//                     strokeWidth="6"
//                     strokeLinecap="round"
//                     strokeDasharray="175.9"
//                     strokeDashoffset="26" // ~85%
//                   />
//                 </svg>
//                 <div className="absolute inset-0 flex items-center justify-center font-bold text-white">85</div>
//               </div>
//               <div>
//                 <div className="text-white font-medium">Alex Smith</div>
//                 <div className="text-xs text-gray-400 font-mono mb-2">Senior Frontend Engineer</div>
//                 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
//                   <TrendingUp size={10} /> Strong Match
//                 </span>
//               </div>
//             </div>
//             <div className="space-y-4">
//               <p className="text-xs text-gray-300 leading-relaxed">
//                 Candidate demonstrated excellent component architecture and state management skills. Minor improvements suggested for initial render performance.
//               </p>
//               <div className="flex gap-3">
//                 <button className="flex-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-600/30 transition-colors py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5">
//                   <CheckCircle2 size={14} /> Advance
//                 </button>
//                 <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5">
//                   <XCircle size={14} /> Reject
//                 </button>
//               </div>
//             </div>
//           </div>
//         </ConsoleFrame>
//       );
//   }
// };

// /* ------------------------------------------------------------------ */
// /* Page Component                                                     */
// /* ------------------------------------------------------------------ */

// export default function HowItWorksPage() {
//   const [activeStep, setActiveStep] = useState(0);
//   const [openFaq, setOpenFaq] = useState<number | null>(0);

//   const step = workflowSteps[activeStep];

//   return (
//     <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900 text-gray-900 pb-20">

//       {/* Hero Section */}
//       <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden px-4">
//         {/* Background Gradients */}
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] pointer-events-none opacity-40 blur-[100px] bg-gradient-to-br from-indigo-100 via-white to-purple-100 -z-10 rounded-full" />

//         <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
//           <div className="flex-1 text-center md:text-left z-10">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-6 shadow-sm"
//             >
//               <Sparkles size={14} /> The Platform Built for Recruiters
//             </motion.div>

//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-6"
//             >
//               How <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">FrontendIQ</span> Works
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="text-lg text-gray-600 max-w-2xl mx-auto md:mx-0 mb-10 leading-relaxed"
//             >
//               From seamless recruiter onboarding to AI-powered candidate evaluation, FrontendIQ simplifies frontend hiring by giving you actionable insights, not just raw scores.
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//               className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start"
//             >
//               <Link href="/become-recruiter" className="w-full sm:w-auto">
//                 <Button size="lg" className="w-full sm:w-auto shadow-indigo-500/20 shadow-lg">
//                   Become a Recruiter
//                 </Button>
//               </Link>
//               <Link href="/pricing" className="w-full sm:w-auto">
//                 <Button variant="outline" size="lg" className="w-full sm:w-auto">
//                   View Pricing
//                 </Button>
//               </Link>
//             </motion.div>
//           </div>

//           <div className="flex-1 w-full max-w-md md:max-w-none relative z-10">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.7, delay: 0.2 }}
//             >
//                <div className="relative bg-white p-2 rounded-3xl shadow-2xl border border-gray-100 transform rotate-1 hover:rotate-0 transition-transform duration-500">
//                   <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none" />
//                   <StepMockup type="report" />
//                </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Interactive Workflow Timeline */}
//       <section className="py-24 bg-gray-50 border-y border-gray-100">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="text-center max-w-2xl mx-auto mb-16">
//             <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
//               The Hiring Workflow
//             </h2>
//             <p className="text-gray-600">
//               A closed-loop platform designed exclusively for professional hiring teams to assess candidates efficiently.
//             </p>
//           </div>

//           {/* Stepper Navigation */}
//           <div className="flex overflow-x-auto pb-6 mb-12 gap-3 hide-scrollbar snap-x snap-mandatory">
//             {workflowSteps.map((s, i) => {
//               const Icon = s.icon;
//               const isActive = activeStep === i;
//               return (
//                 <button
//                   key={s.id}
//                   onClick={() => setActiveStep(i)}
//                   className={`flex items-center gap-3 px-5 py-3 rounded-2xl border snap-start whitespace-nowrap transition-all duration-200 shrink-0 ${
//                     isActive
//                       ? "bg-white border-indigo-200 shadow-md shadow-indigo-100"
//                       : "bg-white/50 border-gray-200 hover:bg-white hover:border-gray-300"
//                   }`}
//                 >
//                   <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
//                     isActive ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-500"
//                   }`}>
//                     <Icon size={16} />
//                   </div>
//                   <div className="text-left">
//                     <div className={`text-[10px] font-mono mb-0.5 ${isActive ? "text-indigo-500" : "text-gray-400"}`}>
//                       STEP {s.eyebrow}
//                     </div>
//                     <div className={`text-sm font-semibold ${isActive ? "text-gray-900" : "text-gray-600"}`}>
//                       {s.label}
//                     </div>
//                   </div>
//                 </button>
//               );
//             })}
//           </div>

//           {/* Step Detail Content */}
//           <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 p-6 md:p-12 overflow-hidden relative min-h-[500px]">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeStep}
//                 initial={{ opacity: 0, y: 15 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -15 }}
//                 transition={{ duration: 0.3 }}
//                 className="grid md:grid-cols-2 gap-12 items-center h-full"
//               >
//                 <div className="order-2 md:order-1">
//                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold font-mono mb-6">
//                     STEP {step.eyebrow}
//                   </div>
//                   <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
//                     {step.title}
//                   </h3>
//                   <p className="text-gray-600 text-lg leading-relaxed mb-8">
//                     {step.description}
//                   </p>
//                   <ul className="space-y-4">
//                     {step.bullets.map((bullet, idx) => (
//                       <li key={idx} className="flex items-start gap-3 text-gray-700">
//                         <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
//                         <span>{bullet}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="order-1 md:order-2">
//                   <StepMockup type={step.mockup} />
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </section>

//       {/* Journeys */}
//       <section className="py-24">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="text-center max-w-2xl mx-auto mb-16">
//             <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
//               Two Perspectives, One Flow
//             </h2>
//             <p className="text-gray-600">
//               Clear, streamlined journeys for both the hiring team and the candidate.
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-2 gap-8">
//             {/* Recruiter Journey */}
//             <div className="bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-100 p-8 md:p-10">
//               <div className="flex items-center gap-3 mb-10">
//                 <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
//                   <LayoutDashboard size={20} />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900">Recruiter Journey</h3>
//               </div>

//               <div className="space-y-2 relative before:absolute before:inset-y-0 before:left-[19px] before:w-[2px] before:bg-gray-100">
//                 {recruiterJourney.map((item, i) => {
//                   const Icon = item.icon;
//                   return (
//                     <motion.div
//                       initial={{ opacity: 0, x: -10 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ delay: i * 0.1 }}
//                       key={item.label}
//                       className="flex items-start gap-5 relative z-10 pb-6 last:pb-0"
//                     >
//                       <div className="w-10 h-10 rounded-full bg-white border-2 border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 shadow-sm mt-0.5">
//                         <Icon size={18} />
//                       </div>
//                       <div className="pt-2">
//                         <h4 className="font-semibold text-gray-900">{item.label}</h4>
//                         <p className="text-sm text-gray-500 mt-1">{item.note}</p>
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Candidate Journey */}
//             <div className="bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-100 p-8 md:p-10">
//               <div className="flex items-center gap-3 mb-10">
//                 <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
//                   <Code2 size={20} />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900">Candidate Journey</h3>
//               </div>

//               <div className="space-y-2 relative before:absolute before:inset-y-0 before:left-[19px] before:w-[2px] before:bg-gray-100">
//                 {candidateJourney.map((item, i) => {
//                   const Icon = item.icon;
//                   return (
//                     <motion.div
//                       initial={{ opacity: 0, x: -10 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ delay: i * 0.1 }}
//                       key={item.label}
//                       className="flex items-start gap-5 relative z-10 pb-6 last:pb-0"
//                     >
//                       <div className="w-10 h-10 rounded-full bg-white border-2 border-purple-100 flex items-center justify-center text-purple-600 shrink-0 shadow-sm mt-0.5">
//                         <Icon size={18} />
//                       </div>
//                       <div className="pt-2">
//                         <h4 className="font-semibold text-gray-900">{item.label}</h4>
//                         <p className="text-sm text-gray-500 mt-1">{item.note}</p>
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FAQ */}
//       <section className="py-24 bg-gray-50 border-t border-gray-100">
//         <div className="max-w-3xl mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
//               Frequently Asked Questions
//             </h2>
//             <p className="text-gray-600">
//               Everything you need to know about the recruiter experience.
//             </p>
//           </div>

//           <div className="space-y-4">
//             {faqs.map((faq, i) => {
//               const isOpen = openFaq === i;
//               return (
//                 <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all hover:border-gray-300">
//                   <button
//                     onClick={() => setOpenFaq(isOpen ? null : i)}
//                     className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
//                   >
//                     <span className="font-semibold text-gray-900 pr-8">{faq.q}</span>
//                     <ChevronDown
//                       className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
//                     />
//                   </button>
//                   <AnimatePresence>
//                     {isOpen && (
//                       <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.3 }}
//                       >
//                         <div className="px-6 pb-6 text-gray-600 leading-relaxed">
//                           {faq.a}
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Final CTA */}
//       <section className="py-24 px-4 max-w-5xl mx-auto">
//         <div className="relative rounded-[2.5rem] overflow-hidden bg-gray-900 px-6 py-20 text-center shadow-2xl">
//           <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-800 opacity-90" />
//           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />

//           <div className="relative z-10 max-w-2xl mx-auto">
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
//               Ready to streamline your frontend hiring?
//             </h2>
//             <p className="text-indigo-100 text-lg mb-10">
//               Join leading tech teams using FrontendIQ to uncover true developer potential with AI-driven, objective evaluations.
//             </p>
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//               <Link href="/become-recruiter" className="w-full sm:w-auto">
//                 <Button size="lg" className="w-full sm:w-auto bg-white text-indigo-700 hover:bg-gray-50 hover:scale-105 border-transparent shadow-xl">
//                   Become a Recruiter
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Tailwind Utilities specific for custom scrollbar hiding */}
//       <style dangerouslySetInnerHTML={{__html: `
//         .hide-scrollbar::-webkit-scrollbar { display: none; }
//         .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}} />
//     </div>
//   );
// }

const page = () => {
  return <HowItworksPage />;
};

export default page;
