import { serverApi } from "@/src/lib/api/server";
import AssessmentForm from "@/src/components/recruiter/AssessmentForm";

export const metadata = {
  title: "Create Assessment | FrontendIQ",
  description: "Create a new AI-powered frontend assessment",
};

export default async function NewAssessmentPage() {
  // SSR Data Fetching
  let categories = [];
  try {
    const res = await serverApi.getCategories();
    categories = res.data || [];
  } catch (error) {
    console.error("Failed to fetch categories during SSR", error);
    // Even if fetch fails, we pass empty categories or a fallback, 
    // real app might show an error state component
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Assessment</h1>
        <p className="text-gray-500 mt-2">
          Set up a technical assessment for frontend developers. Choose manual entry or let AI generate questions based on the topic.
        </p>
      </div>

      <AssessmentForm categories={categories} />
    </div>
  );
}
