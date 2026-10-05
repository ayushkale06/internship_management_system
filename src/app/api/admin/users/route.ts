import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const dbUsers = await prisma.user.findMany({
      include: {
        studentProfile: true,
        facultyProfile: true
      },
      orderBy: { createdAt: 'desc' }
    });

    const mappedUsers = dbUsers.map(u => ({
      id: u.id,
      email: u.email,
      role: u.role,
      status: u.isActive ? 'Active' : 'Deactivated',
      name: u.studentProfile?.name || u.facultyProfile?.name || (u.role === 'company' ? 'Company Account' : 'Admin User')
    }));

    return NextResponse.json(mappedUsers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
