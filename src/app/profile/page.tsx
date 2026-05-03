'use client'

import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded-2xl bg-white p-10 shadow-2xl">
        <h1 className="mb-6 text-3xl font-bold">Create Profile</h1>

        <input
          placeholder="Your Name"
          className="mb-4 w-full rounded border p-3"
        />

        <input
          placeholder="Skills"
          className="mb-4 w-full rounded border p-3"
        />

        <button
          className="w-full rounded bg-indigo-600 p-3 text-white"
          onClick={() => router.push('/dashboard')}
        >
          Save & Go to Dashboard
        </button>
      </div>
    </div>
  )
}