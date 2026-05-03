'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateProfile() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    email: '',
    bio: ''
  })

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (res.ok) {
        alert('Profile created ✅')
        router.push('/dashboard')
      } else {
        alert('Failed to create profile')
      }
    } catch (err) {
      alert('Error creating profile')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl"
      >
        <h1 className="mb-6 text-2xl font-bold">Create Profile</h1>

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="mb-4 w-full rounded border p-3"
          required
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="mb-4 w-full rounded border p-3"
          required
        />

        <textarea
          name="bio"
          placeholder="Bio"
          value={form.bio}
          onChange={handleChange}
          className="mb-4 w-full rounded border p-3"
        />

        <button
          type="submit"
          className="w-full rounded bg-indigo-600 p-3 text-white"
        >
          Save Profile
        </button>
      </form>
    </div>
  )
}