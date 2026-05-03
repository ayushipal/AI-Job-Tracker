import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const jobSchema = z.object({
  title: z.string().min(1),
  company: z.string().min(1),
  description: z.string().optional(),
  url: z.string().optional(),
  status: z.enum(["APPLIED", "INTERVIEW", "OFFER", "REJECTED"]),
});

// UPDATE JOB
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const data = jobSchema.parse(body);

    const updatedJob = await prisma.job.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedJob);
  } catch (error: any) {
    console.error("PUT ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Failed to update job" },
      { status: 500 }
    );
  }
}

// DELETE JOB
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.job.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Failed to delete job" },
      { status: 500 }
    );
  }
}