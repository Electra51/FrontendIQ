import type { Metadata } from "next";
import Link from "next/link";
import { faqs, featureCards, featuredAssessments, performers, quizCategories, testimonials } from "../../lib/landingPageData";
import { topics } from "../../lib/quizData";
import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/pages/homepage/Hero";
import WhyTeamsUseIt from "../../components/pages/homepage/WhyTeamsUseIt";
import AudienceSplit from "@/src/components/pages/homepage/AudienceSplit";


export const metadata: Metadata = {
  title: "Frontend Developer Assessment Platform",
  description:
    "Evaluate frontend engineering skills with structured assessments for React, Next.js, TypeScript, and Tailwind CSS.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <Hero/>
<WhyTeamsUseIt/>
        {/* <section className="container-custom pb-16">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Why teams use it</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">A practical assessment experience for modern frontend roles</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featureCards.map((feature) => (
              <div key={feature.title} className="card">
                <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section> */}

        <section className="container-custom pb-16">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Quiz categories</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Choose a category and start assessing</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {quizCategories.map((category) => (
              <article key={category.title} className="card">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">{category.title}</h3>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                    {category.level}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600">{category.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="container-custom pb-16">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Popular assessments</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">High-impact challenges for modern frontend teams</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredAssessments.map((assessment) => (
              <article key={assessment.title} className="card">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">{assessment.title}</h3>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                    {assessment.level}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600">{assessment.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="container-custom pb-16">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Top performers</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Learners and teams improving with every challenge</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {performers.map((performer) => (
              <div key={performer.name} className="card">
                <p className="text-3xl font-semibold text-slate-900">{performer.score}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{performer.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{performer.role}</p>
                <p className="mt-4 text-sm text-slate-500">{performer.highlight}</p>
              </div>
            ))}
          </div>
        </section>
<AudienceSplit/>
        <section className="container-custom pb-16">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Testimonials</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">What learners say about FrontendIQ</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.name} className="card">
                <p className="text-slate-600">“{testimonial.quote}”</p>
                <footer className="mt-5">
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.title}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="container-custom pb-16">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">FAQ</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Common questions about FrontendIQ</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <summary className="cursor-pointer font-semibold text-slate-900">{faq.question}</summary>
                <p className="mt-3 text-sm leading-6 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="container-custom pb-20">
          <div className="rounded-3xl border border-blue-100 bg-linear-to-r from-blue-600 to-purple-600 p-8 text-white shadow-xl">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Ready to begin?</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Take your next step with a modern frontend assessment platform.</h2>
              <p className="mt-4 text-blue-50">Start practicing, evaluating, and improving with FrontendIQ today.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/assessments" className="rounded-full bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-slate-100">
                Start Assessment
              </Link>
              <Link href="/topics" className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                Explore Topics
              </Link>
            </div>
          </div>
        </section>

        <section className="container-custom pb-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Featured topics</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Start where you are</h2>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {topics.map((topic) => (
              <article key={topic.slug} className="card">
                <h3 className="text-lg font-semibold text-slate-900">{topic.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{topic.description}</p>
                <Link href={`/topics/${topic.slug}`} className="mt-4 inline-flex font-semibold text-blue-600 hover:text-blue-700">
                  Open topic →
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
     
    </div>
  );
}
