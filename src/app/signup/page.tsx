'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
    } else {
      router.push('/login')
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSignup} className="space-y-4 rounded-lg border p-6">
        <h1 className="text-2xl font-bold">Signup</h1>

        <input
          className="w-full border p-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black px-4 py-2 text-white">
          Signup
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  )
}