'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { Lock, Mail, Briefcase } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Signup failed')
      setLoading(false)
      return
    }

    router.push('/login')
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-2 text-3xl font-black text-center text-gray-800">
          AI Job Tracker
        </h1>

        {/* Title */}
        <h1 className="mb-2 text-3xl font-black text-center text-gray-800">
          Create Account
        </h1>
        <p className="mb-8 text-center text-gray-500">
          Register for AI Job Tracker
        </p>
        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 text-xs font-medium">
          <span className="px-3 py-1 text-indigo-700 bg-indigo-100 rounded-full">
            AI Resume Analysis
          </span>
          <span className="px-3 py-1 text-purple-700 bg-purple-100 rounded-full">
            LinkedIn Tools
          </span>
          <span className="px-3 py-1 text-pink-700 bg-pink-100 rounded-full">
            Job Tracking
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          
          {/* Email */}
          <div className="relative">
            <Mail className="absolute w-5 h-5 text-gray-400 top-4 left-4" />
            <input
              type="email"
              placeholder="Email address"
              className="w-full py-3 pl-12 pr-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute w-5 h-5 text-gray-400 top-4 left-4" />
            <input
              type="password"
              placeholder="Password"
              className="w-full py-3 pl-12 pr-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm font-medium text-center text-red-500">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-bold text-white transition rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        {/* Login link */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}