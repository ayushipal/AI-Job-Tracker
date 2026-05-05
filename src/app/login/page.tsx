'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

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

    try {
      const res = await signIn('credentials', {
        redirect: false, // we handle redirect manually
        email,
        password,
      })

      console.log('LOGIN RESPONSE:', res)

      // ❌ If error → show message
      if (res?.error) {
        setError('Invalid email or password')
        setLoading(false)
        return
      }

      // ✅ Success → redirect
      router.push('/dashboard')
      router.refresh() // 🔥 ensures session is updated
    } catch (err) {
      setError('Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl"
      >
        <h2 className="mb-6 text-2xl font-bold text-center">
          Login
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
          required
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 text-white bg-indigo-600 rounded"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {/* Error */}
        {error && (
          <p className="mt-3 text-center text-red-500">{error}</p>
        )}

        {/* Redirect to signup */}
        <p className="mt-4 text-center">
          New user?{' '}
          <span
            onClick={() => router.push('/signup')}
            className="text-indigo-600 cursor-pointer"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  )
}