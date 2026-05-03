export type Job = {
  id: string;
  title: string;
  company: string;
  description?: string | null;
  url?: string | null;
  location?: string | null;
  status: "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED";
  createdAt: string;
  updatedAt?: string;
  userId: string;
};