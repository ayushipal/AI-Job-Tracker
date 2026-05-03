"use client"

import { useForm } from "react-hook-form"

type FormData = {
  company: string
  role: string
  status: string
}

export default function JobForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    console.log("FORM DATA:", data) // DEBUG

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
    company,
    description,
    status,
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        console.error("API ERROR:", result)
        alert("❌ Failed: " + JSON.stringify(result))
        return
      }

      alert("✅ Job added successfully")
      reset()
    } catch (error) {
      console.error("NETWORK ERROR:", error)
      alert("❌ Something went wrong")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      {/* COMPANY */}
      <input
        {...register("company")}
        placeholder="Company"
        className="w-full p-2 border rounded"
      />

      {/* ROLE */}
      <input
        {...register("role")}
        placeholder="Role"
        className="w-full p-2 border rounded"
      />

      {/* STATUS */}
      <select
        {...register("status")}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Status</option>
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
      </select>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 text-white bg-blue-600 rounded"
      >
        {isSubmitting ? "Adding..." : "Track New Job"}
      </button>
    </form>
  )
}