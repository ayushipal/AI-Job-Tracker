'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, Mail, Briefcase } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (res?.ok) {
      router.push('/dashboard')
    } else {
      setError('Invalid email or password')
    }

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
          Welcome Back
        </h1>
        <p className="mb-8 text-center text-gray-500">
          Login to your AI Job Tracker
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
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
            <Lock className="absolute w-5 h-5 text-gray-400 top-4 left-4"
            />
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
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Signup link */}
        <p className="mt-6 text-center text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/signup"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}