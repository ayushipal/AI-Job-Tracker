'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    // fake register (you can connect DB later)
    setTimeout(() => {
      router.push('/login')
    }, 1000)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl"
      >
        <h2 className="mb-6 text-2xl font-bold text-center">
          Create Account
        </h2>

        <input
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded"
          required
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full p-3 mb-4 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full p-3 text-white bg-indigo-600 rounded"
        >
          {loading ? 'Creating...' : 'Register'}
        </button>

        <p className="mt-4 text-center">
          Already have an account?{' '}
          <span
            onClick={() => router.push('/login')}
            className="text-indigo-600 cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  )
}