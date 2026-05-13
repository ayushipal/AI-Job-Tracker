'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Brain } from 'lucide-react'

export default function AIChatPage() {
  const router = useRouter()

  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const askAI = async () => {
    if (!message) return

    setLoading(true)
    setResponse('')

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: message,
            },
          ],
        }),
      })

      const data = await res.json()
      setResponse(data.content)
    } catch {
      setResponse('AI service temporarily unavailable. Please try again.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b shadow-lg bg-white/95 backdrop-blur-xl">
        <div className="flex items-center justify-between max-w-6xl px-6 py-5 mx-auto">
          
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center px-5 py-3 font-bold border rounded-xl hover:bg-gray-50"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600">
              <Brain className="text-white h-7 w-7" />
            </div>
            <h1 className="text-2xl font-black">
              AI Career Coach
            </h1>
          </div>
        </div>
      </header>

      {/* AI CHAT CARD */}
      <div className="max-w-4xl p-8 mx-auto mt-10">
        <div className="p-8 bg-white shadow-xl rounded-3xl">
          <h2 className="mb-6 text-3xl font-black">
            🤖 Ask AI Anything
          </h2>

          <textarea
            className="w-full h-40 p-4 border rounded-xl"
            placeholder="Ask AI anything...

Examples:
• Analyze my resume
• Generate cover letter
• Interview questions for React developer"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            onClick={askAI}
            className="px-6 py-3 mt-4 text-white rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600"
          >
            {loading ? 'Thinking...' : 'Ask AI'}
          </button>

          {response && (
            <div className="p-6 mt-6 whitespace-pre-wrap bg-gray-100 rounded-xl">
              {response}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}