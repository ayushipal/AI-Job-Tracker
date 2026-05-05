'use client'

import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl">
        <h1 className="mb-6 text-3xl font-bold text-center">
          Create Profile
        </h1>

        <input
          placeholder="Full Name"
          className="w-full p-3 mb-4 border rounded"
        />

        <input
          placeholder="Skills (React, Node, etc)"
          className="w-full p-3 mb-4 border rounded"
        />

        <button
          className="w-full p-3 text-white bg-indigo-600 rounded"
          onClick={() => router.push('/dashboard')}
        >
          Save & Go to Dashboard
        </button>
      </div>
    </div>
  )
}