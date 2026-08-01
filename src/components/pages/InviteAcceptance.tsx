"use client";

import { useAuth } from "@/src/context/AuthContext";
import { AlertTriangle, CheckCircle2, ChevronRight, Loader2 } from "lucide-react";
import Button from "@/src/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

interface InviteAcceptanceProps {
  quiz: any;
  error: string | null;
  token: string;
}

export default function InviteAcceptance({ quiz, error, token }: InviteAcceptanceProps) {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [accepting, setAccepting] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl text-center">
        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Invalid Link</h2>
        <p className="text-gray-500">
          {error || "This invitation link is invalid or has already been used. Please contact your recruiter for a new link."}
        </p>
        <div className="pt-4">
          <Button onClick={() => router.push("/")} variant="outline" className="w-full">
            Return to Homepage
          </Button>
        </div>
      </div>
    );
  }

  const handleAccept = async () => {
    setAccepting(true);
    try {
      // In a real application, you would make an API call to link the user to the assessment.
      // Example: await userApi.assignAssessment({ quizId: quiz._id, token });
      
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Assessment Accepted!',
        showConfirmButton: false,
        timer: 2000
      });
      
      router.push("/candidate/dashboard");
    } catch (err: any) {
      Swal.fire("Error", err.message || "Failed to accept assessment", "error");
    } finally {
      setAccepting(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100 text-center">
      <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 className="w-10 h-10" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900">You've Been Invited!</h2>
        <p className="mt-2 text-gray-500">
          You have a pending technical assessment request for:
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <h3 className="font-bold text-gray-800 text-lg">{quiz.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{quiz.description}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
          <span className="bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-600">
            {quiz.difficulty}
          </span>
          <span className="bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-600">
            {quiz.timeLimit} Minutes
          </span>
          <span className="bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-600">
            {quiz.questions?.length || 10} Questions
          </span>
        </div>
      </div>

      <div className="pt-4">
        {!isAuthenticated ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Please register or log in to accept this assessment and track your results.
            </p>
            <div className="flex gap-4">
              <Link href="/register" className="flex-1">
                <Button className="w-full">Register</Button>
              </Link>
              <Link href="/login" className="flex-1">
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
             <p className="text-sm text-gray-500">
              Logged in as <span className="font-semibold text-gray-800">{user?.email}</span>
            </p>
            <Button 
              onClick={handleAccept} 
              disabled={accepting} 
              className="w-full flex items-center justify-center gap-2"
            >
              {accepting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Accept & Go to Dashboard"}
              {!accepting && <ChevronRight className="w-5 h-5" />}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
