import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export async function serverApiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const url = `${API_URL}${endpoint}`;
  
  const fetchOptions = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      ...options.headers,
    },
  };

  const response = await fetch(url, fetchOptions);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Server Request failed");
  }

  return data;
}

export const serverApi = {
  async getCategories() {
    return serverApiRequest<any>("/categories");
  },
  async getQuizById(id: string) {
    return serverApiRequest<any>(`/quizzes/${id}`);
  },
};
