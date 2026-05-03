"use client";

import { useForm } from "react-hook-form";

type FormData = {
  title: string;
  company: string;
  description?: string;
  status: string;
};

export default function JobForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log("FORM DATA:", data);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("API ERROR:", result);
        alert("❌ Failed: " + JSON.stringify(result));
        return;
      }

      alert("✅ Job added successfully");
      reset();
    } catch (error) {
      console.error("NETWORK ERROR:", error);
      alert("❌ Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      {/* TITLE */}
      <input
        {...register("title")}
        placeholder="Job Title / Role"
        className="w-full rounded border p-2"
      />

      {/* COMPANY */}
      <input
        {...register("company")}
        placeholder="Company"
        className="w-full rounded border p-2"
      />

      {/* DESCRIPTION */}
      <input
        {...register("description")}
        placeholder="Description (optional)"
        className="w-full rounded border p-2"
      />

      {/* STATUS */}
      <select
        {...register("status")}
        className="w-full rounded border p-2"
      >
        <option value="">Select Status</option>
        <option value="APPLIED">Applied</option>
        <option value="INTERVIEW">Interview</option>
        <option value="OFFER">Offer</option>
        <option value="REJECTED">Rejected</option>
      </select>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded bg-blue-600 px-4 py-2 text-white"
      >
        {isSubmitting ? "Adding..." : "Track New Job"}
      </button>
    </form>
  );
}