import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const userMessage = messages[messages.length - 1]?.content || 'Hello';

    let response = '';
    
    if (userMessage.toLowerCase().includes('analyze') || userMessage.toLowerCase().includes('job')) {
      response = ` **Job Analysis Report**

**Match Score: 87%** ⭐⭐⭐⭐

**Your Strengths:**
- Next.js 16 + React expertise
- Fullstack development skills  
- TypeScript proficiency

 **Gaps to Fill:**
- Add Docker/Kubernetes experience
- Learn advanced Prisma queries

 **Next Steps:**
1. Update resume with metrics
2. Practice LeetCode medium
3. Apply to 3 more roles today

You're doing great! Keep going! 💪`;
    } 
    else if (userMessage.toLowerCase().includes('resume')) {
      response = `📄 **Resume Optimization Tips**

**Quick Wins:**
- **Quantify achievements** (e.g. "Built app → 10K users")
- **1 line per bullet** max
- **Keywords from job desc** 
- **Skills section first**

**Pro Tip:** Tailor 15% for each application`;
    }
    else if (userMessage.toLowerCase().includes('interview')) {
      response = `🎤 **Interview Mastery Plan**

**Day 1:** Behavioral (STAR method)
**Day 2:** System Design basics  
**Day 3:** Mock interviews

**Ask Interviewer:**
- Team structure?
- Tech roadmap?
- Success metrics?

Practice on Pramp/Interviewing.io!`;
    }
    else {
      response = `🤖 **AI Career Coach**

Smart question! My top advice:

**Daily Routine:**
- 30min LeetCode
- 3 job applications  
- 15min networking

**Pro Move:** 
Follow up every application in 7 days

What can I help with next? 👇`;
    }

    // Simulate AI typing delay
    await new Promise(r => setTimeout(r, 1200));

    return NextResponse.json({ 
      content: response 
    });
  } catch (error) {
    console.log('AI Mock error:', error);
    return NextResponse.json({ 
      content: "🤖 AI Coach: Great question! Track daily, customize resumes, and follow up. What's next?" 
    });
  }
}