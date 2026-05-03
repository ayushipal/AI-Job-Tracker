"use client";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Brain, Bot } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "🤖 Hi! I'm your AI Career Coach. Ask me about job analysis, resume tips, interview prep, or anything career-related!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await axios.post("/api/ai/chat", { messages: [...messages, userMessage] });
      setMessages((prev) => [...prev, res.data]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Try again!" },
      ]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <Card className="border-0 shadow-2xl h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <Brain className="w-8 h-8 text-purple-600" />
          AI Career Coach
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 p-0">
        <ScrollArea className="flex-1 p-6 space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow-lg ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                    : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-md px-4 py-3 shadow-lg bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-bounce" />
                  <span className="text-sm text-gray-600">AI is typing...</span>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
        
        <div className="p-6 border-t bg-white/50">
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !loading && handleSend()}
              placeholder="Ask about resume tips, interview prep, job analysis..."
              className="flex-1"
              disabled={loading}
            />
            <Button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="mt-2 text-xs text-center text-gray-500">
            Try: "Analyze my resume" or "Interview tips for FAANG"
          </p>
        </div>
      </CardContent>
    </Card>
  );
}