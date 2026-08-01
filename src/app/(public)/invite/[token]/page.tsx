import { serverApi } from "@/src/lib/api/server";
import InviteAcceptance from "@/src/components/pages/InviteAcceptance";

export const metadata = {
  title: "Assessment Invitation | FrontendIQ",
};

export default async function InvitePage({ params }: { params: Promise<{ token: string }> }) {
  const resolvedParams = await params;
  const token = resolvedParams.token;
  
  // We mock parsing the quiz ID from our generated token: token_quizId_randomStr
  const parts = token.split("_");
  const quizId = parts[1];

  let quiz = null;
  let error = null;

  try {
    if (quizId) {
      const res = await serverApi.getQuizById(quizId);
      quiz = res.data;
    } else {
      error = "Invalid invitation token format.";
    }
  } catch (err: any) {
    error = err.message || "Invitation link is invalid or expired.";
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <InviteAcceptance quiz={quiz} error={error} token={token} />
    </div>
  );
}
