import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch all active internships from the REAL database via Prisma
    const internships = await prisma.internship.findMany({
      where: { status: 'active' },
      include: {
        company: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    // Format the response for the frontend
    const formatted = internships.map(i => ({
      id: i.id,
      company: i.company.name,
      role: i.title,
      domain: i.domain,
      location: i.locationType === 'Remote' ? 'Remote' : i.company.location,
      type: i.locationType,
      stipend: i.stipend,
      duration: `${i.durationWeeks} Weeks`,
      tags: JSON.parse(i.tags),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Database Error - GET /api/internships:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
