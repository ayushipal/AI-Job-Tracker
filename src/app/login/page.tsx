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
    callbackUrl: "/dashboard",
  })

  console.log("LOGIN RESPONSE:", res)

  if (res?.error) {
    setError(res.error || "Login failed")
    setLoading(false)
    return
  }

  
  if (res?.url) {
    router.push(res.url)
  }

  setLoading(false)
}
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
      >
        <h2 className="mb-6 text-center text-2xl font-bold">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded border p-3"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded border p-3"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-indigo-600 p-3 text-white"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && (
          <p className="mt-3 text-center text-red-500">{error}</p>
        )}

        <p className="mt-4 text-center">
          New user?{' '}
          <span
            onClick={() => router.push('/signup')}
            className="cursor-pointer text-indigo-600"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  )
}