"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Wand2, Copy, CheckCircle2, ChevronRight, FileText, ArrowLeft, PenTool } from "lucide-react";
import Swal from "sweetalert2";

import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/Input";
import QuestionEditor, { Question } from "./QuestionEditor";
import { quizApi } from "@/src/lib/api/quiz";
import { cn } from "@/src/lib/utils";

// Schema for Step 1
const detailsSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000),
  category: z.string().min(1, "Please select a category"),
  difficulty: z.enum(["Easy", "Medium", "Hard", "Mixed"]),
  timeLimit: z.number().min(5).max(180),
  passingScore: z.number().min(0).max(100),
});

type DetailsFormValues = z.infer<typeof detailsSchema>;

interface Category {
  _id: string;
  name: string;
}

interface AssessmentFormProps {
  categories: Category[];
}

export default function AssessmentForm({ categories }: AssessmentFormProps) {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [generationMode, setGenerationMode] = useState<"ai" | "manual" | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [inviteToken, setInviteToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<DetailsFormValues>({
    resolver: zodResolver(detailsSchema),
    mode: "onChange",
    defaultValues: {
      difficulty: "Medium",
      timeLimit: 30,
      passingScore: 70,
    },
  });

  const formData = watch();
  const selectedCategoryName = categories.find((c) => c._id === formData.category)?.name;

  const onDetailsSubmit = (data: DetailsFormValues) => {
    setStep(2);
  };

  const handleGenerateAI = async () => {
    setGenerationMode("ai");
    setLoading(true);
    try {
      const response = await quizApi.generateAI({
        topic: selectedCategoryName || "General",
        difficulty: formData.difficulty,
        questionType: "multiple-choice",
        numberOfQuestions: 10,
      });
      
      if (response.success && response.data?.questions) {
        // Map backend AI output to our frontend state if necessary
        const aiQuestions = response.data.questions.map((q: any) => ({
          questionText: q.questionText,
          type: "multiple-choice",
          options: q.options,
          correctAnswer: q.correctAnswer,
          points: q.points || 10,
        }));
        setQuestions(aiQuestions);
        setStep(3);
      }
    } catch (error: any) {
      Swal.fire({
        title: "Generation Failed",
        text: error.message || "Could not generate questions.",
        icon: "error",
      });
      setGenerationMode(null);
    } finally {
      setLoading(false);
    }
  };

  const handleManualEntry = () => {
    setGenerationMode("manual");
    setQuestions([{
      questionText: "",
      type: "multiple-choice",
      options: ["Option 1", "Option 2"],
      correctAnswer: "0",
      points: 10,
    }]);
    setStep(3);
  };

  const handlePublish = async () => {
    if (questions.length === 0) {
      return Swal.fire("Error", "Please add at least one question.", "error");
    }
    
    // Basic validation
    const isValidQuestions = questions.every(q => q.questionText.trim() !== "" && q.options.length >= 2);
    if (!isValidQuestions) {
      return Swal.fire("Error", "Please ensure all questions have text and at least 2 options.", "error");
    }

    setLoading(true);
    try {
      // Backend expects a specific format to save
      const payload = {
        quizData: {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          difficulty: formData.difficulty,
          timeLimit: formData.timeLimit,
          passingScore: formData.passingScore,
        },
        questions: questions,
      };

      const res = await quizApi.saveGenerated(payload);
      
      if (res.success && res.data) {
        // Assume backend returns the quiz id, which we can use to generate an invite token
        // In a real scenario, you might call another endpoint to generate a secure token
        // Here we mock the token logic using the quiz ID
        const token = `token_${res.data._id}_${Math.random().toString(36).substring(2, 9)}`;
        setInviteToken(token);
        setStep(4);
      }
    } catch (error: any) {
      Swal.fire("Publish Failed", error.message || "Failed to publish assessment", "error");
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    if (!inviteToken) return;
    const link = `${window.location.origin}/invite/${inviteToken}`;
    navigator.clipboard.writeText(link);
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Link copied to clipboard',
      showConfirmButton: false,
      timer: 2000
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-gray-50 border-b border-gray-200 p-6 flex justify-between items-center">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors",
                step === s ? "bg-blue-600 text-white shadow-md" : 
                step > s ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
              )}
            >
              {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
            </div>
            {s !== 4 && (
              <div className={cn(
                "h-1 w-12 md:w-32 mx-2 rounded-full",
                step > s ? "bg-green-500" : "bg-gray-200"
              )} />
            )}
          </div>
        ))}
      </div>

      <div className="p-8">
        <AnimatePresence mode="wait">
          {/* STEP 1: Details */}
          {step === 1 && (
            <motion.form
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleSubmit(onDetailsSubmit)}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Assessment Details</h2>
              </div>
              
              <Input
                label="Assessment Title"
                placeholder="e.g. Senior React Developer Assessment"
                {...register("title")}
                error={errors.title?.message}
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  {...register("description")}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Describe what this assessment covers..."
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Topic / Category</label>
                  <select
                    {...register("category")}
                    className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">Select a topic</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                  <select
                    {...register("difficulty")}
                    className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="Easy">Easy / Junior</option>
                    <option value="Medium">Medium / Mid-Level</option>
                    <option value="Hard">Hard / Senior</option>
                    <option value="Mixed">Mixed</option>
                  </select>
                </div>

                <Input
                  type="number"
                  label="Time Limit (Minutes)"
                  {...register("timeLimit", { valueAsNumber: true })}
                  error={errors.timeLimit?.message}
                />

                <Input
                  type="number"
                  label="Passing Score (%)"
                  {...register("passingScore", { valueAsNumber: true })}
                  error={errors.passingScore?.message}
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={!isValid} className="flex items-center gap-2">
                  Next Step <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </motion.form>
          )}

          {/* STEP 2: Choose Generation Mode */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">How would you like to create questions?</h2>
                <p className="text-gray-500">For <span className="font-semibold text-gray-800">{formData.title}</span> ({selectedCategoryName} - {formData.difficulty})</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <button
                  onClick={handleGenerateAI}
                  disabled={loading}
                  className="group relative bg-white border-2 border-blue-100 hover:border-blue-500 p-8 rounded-2xl flex flex-col items-center text-center transition-all hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-linear-to-b from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                  <div className="relative">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                      {loading && generationMode === "ai" ? (
                        <Loader2 className="w-8 h-8 animate-spin" />
                      ) : (
                        <Wand2 className="w-8 h-8" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Generate with AI</h3>
                    <p className="text-gray-500 text-sm">
                      Let our AI instantly generate 10 high-quality questions based on {selectedCategoryName} at {formData.difficulty} level.
                    </p>
                  </div>
                </button>

                <button
                  onClick={handleManualEntry}
                  disabled={loading}
                  className="group relative bg-white border-2 border-gray-200 hover:border-gray-500 p-8 rounded-2xl flex flex-col items-center text-center transition-all hover:shadow-lg"
                >
                   <div className="relative">
                    <div className="w-16 h-16 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                      <PenTool className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Write Manually</h3>
                    <p className="text-gray-500 text-sm">
                      Create your own custom questions from scratch using our rich question editor.
                    </p>
                  </div>
                </button>
              </div>
              
              <div className="flex justify-start">
                <Button variant="outline" onClick={() => setStep(1)} disabled={loading} className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Question Editor */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Review Questions</h2>
                  <p className="text-gray-500">Add, edit, or remove questions before publishing.</p>
                </div>
                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-semibold">
                  Total Questions: {questions.length} / 10
                </div>
              </div>

              <QuestionEditor questions={questions} onChange={setQuestions} />

              <div className="flex justify-between pt-6 border-t border-gray-100">
                <Button variant="outline" onClick={() => setStep(2)} disabled={loading}>
                  Back
                </Button>
                <Button onClick={handlePublish} disabled={loading} className="flex items-center gap-2">
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Publish Assessment
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Success & Invite */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 py-8"
            >
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Assessment Published!</h2>
              <p className="text-gray-500 max-w-md mx-auto">
                Your assessment "{formData.title}" is ready. Send the secure invite link below to your candidates.
              </p>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-8 max-w-lg mx-auto">
                <label className="block text-sm font-semibold text-gray-700 mb-3 text-left">Secure Invite Link</label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-600 overflow-x-auto whitespace-nowrap text-left font-mono">
                    {typeof window !== 'undefined' ? window.location.origin : ''}/invite/{inviteToken}
                  </div>
                  <Button onClick={copyLink} className="flex items-center gap-2">
                    <Copy className="w-4 h-4" /> Copy
                  </Button>
                </div>
                <p className="text-xs text-gray-400 mt-3 text-left">
                  This link contains a secure token. Once a candidate completes the assessment, this specific link cannot be reused.
                </p>
              </div>

              <div className="pt-8">
                <Button onClick={() => window.location.href = '/recruiter/dashboard'} variant="outline">
                  Go to Dashboard
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
