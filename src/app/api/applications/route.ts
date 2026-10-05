import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Helper to ensure a dummy student exists for our prototype
async function ensureStudentExists() {
  let user = await prisma.user.findFirst({ where: { email: 'alex@nexus.com' } });
  if (!user) {
    user = await prisma.user.create({ 
      data: { email: 'alex@nexus.com', passwordHash: 'secret', role: 'student' } 
    });
    await prisma.student.create({ 
      data: { userId: user.id, name: 'Alex Rivera', department: 'Computer Science', gpa: 3.8 } 
    });
  }
  return user.id;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role') || 'student';

  try {
    if (role === 'student') {
      const apps = await prisma.application.findMany({
        include: { internship: { include: { company: true } } },
        orderBy: { appliedAt: 'desc' }
      });
      return NextResponse.json(apps);
    } else {
      const apps = await prisma.application.findMany({
        include: { student: true, internship: true },
        orderBy: { appliedAt: 'desc' }
      });
      return NextResponse.json(apps);
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Database Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const studentId = await ensureStudentExists();

    const application = await prisma.application.create({
      data: {
        studentId: studentId,
        internshipId: body.internshipId,
        resumeUrl: 'alex_rivera_resume.pdf',
        status: 'Pending Review'
      }
    });
    return NextResponse.json(application, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'You have already applied to this internship.' }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const app = await prisma.application.update({
      where: { id: body.id },
      data: { status: body.status }
    });
    return NextResponse.json(app);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Database Error' }, { status: 500 });
  }
}
