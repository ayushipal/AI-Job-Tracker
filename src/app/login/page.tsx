'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'

export default function LoginPage() {
  const [message, setMessage] = useState('')

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage('Button clicked')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    console.log('Trying login...')

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    console.log('LOGIN RESPONSE:', res)

    setMessage(JSON.stringify(res))
  }

  return (
    <div className="p-10">
      <h1>Login Test</h1>

      <form onSubmit={handleLogin}>
        <input
          name="email"
          placeholder="Email"
          className="block p-2 mb-2 border"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="block p-2 mb-2 border"
        />

        <button
          type="submit"
          className="p-2 text-white bg-blue-500"
        >
          Login
        </button>
      </form>

      <p>{message}</p>
    </div>
  )
}