'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

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

console.log("SIGNUP RESPONSE:", data)

if (!res.ok) {
  setError(data.error || "Signup failed")
  setLoading(false)
  return
}
    router.push('/login')
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <form onSubmit={handleRegister} className="p-8 bg-white w-96 rounded-xl">
        <h2 className="mb-4 text-2xl text-center">Create Account</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-3 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-3 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full p-3 text-white bg-indigo-600">
          {loading ? 'Creating...' : 'Register'}
        </button>

        {error && <p className="mt-2 text-red-500">{error}</p>}

        <p className="mt-3 text-center">
          Already have account?{' '}
          <span
            className="text-indigo-600 cursor-pointer"
            onClick={() => router.push('/login')}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  )
}