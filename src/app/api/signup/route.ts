import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    
    console.log("📧 Signup attempt for:", email);

    // Validation
    if (!email || !password || password.length < 6) {
      return NextResponse.json({ error: "Email and password (6+ chars) required" }, { status: 400 });
    }

    // Check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      console.log("❌ User exists:", email);
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    // Hash password & create user
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    console.log("✅ New user created:", user.id);

    return NextResponse.json({ 
      success: true, 
      message: "Account created successfully!",
      user: { id: user.id, email: user.email }
    }, { status: 201 });

  } catch (error) {
    console.error("💥 Signup error:", error);
    return NextResponse.json({ error: "Server error. Try again." }, { status: 500 });
  }
}