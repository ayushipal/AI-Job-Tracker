'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true)

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    console.log("LOGIN RESPONSE:", res);

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }

    setLoading(false)
  };

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
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
          required
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full p-3 text-white bg-indigo-600 rounded"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="mt-4 text-center">
          New user?{' '}
          <span
            onClick={() => router.push('/')}
            className="text-indigo-600 cursor-pointer"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  )
}