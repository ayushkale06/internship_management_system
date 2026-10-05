import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Hash password securely before saving
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const roleString = body.role.toLowerCase();
    
    // Build nested profile based on role
    const userData: any = {
      email: body.email,
      passwordHash: hashedPassword,
      role: roleString,
    };

    if (roleString === "student") {
      userData.studentProfile = { create: { name: body.name || "New Student", department: "Unassigned" } };
    } else if (roleString === "faculty") {
      userData.facultyProfile = { create: { name: body.name || "New Faculty", department: "Unassigned" } };
    }

    // Create the user in the SQLite database
    const user = await prisma.user.create({
      data: userData
    });

    return NextResponse.json({ success: true, user: { id: user.id, email: user.email } });
  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json({ error: "Failed to create user. Email may already exist." }, { status: 400 });
  }
}
