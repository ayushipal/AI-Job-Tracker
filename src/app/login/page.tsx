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

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    console.log("LOGIN RESPONSE:", res)

    if (res?.error) {
      setError('Invalid email or password')
      setLoading(false)
      return
    }

    if (res?.ok) {
      router.replace('/dashboard')
    }

    setLoading(false)
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

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 text-white bg-indigo-600 rounded"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && (
          <p className="mt-3 text-center text-red-500">
            {error}
          </p>
        )}

        <p className="mt-4 text-center">
          New user?{" "}
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