const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Create a Company
  const company1 = await prisma.company.upsert({
    where: { registrationNumber: 'REG-12345' },
    update: {},
    create: {
      name: 'TechNova Solutions',
      registrationNumber: 'REG-12345',
      location: 'San Francisco, CA',
      contactPerson: 'Sarah Jenkins',
    },
  });

  const company2 = await prisma.company.upsert({
    where: { registrationNumber: 'REG-67890' },
    update: {},
    create: {
      name: 'Nexus Design',
      registrationNumber: 'REG-67890',
      location: 'Remote',
      contactPerson: 'David Chen',
    },
  });

  // 2. Create Internships
  await prisma.internship.create({
    data: {
      companyId: company1.id,
      title: 'Frontend Developer Intern',
      description: 'Work on cutting-edge React applications.',
      domain: 'Software Engineering',
      locationType: 'Hybrid',
      durationWeeks: 12,
      stipend: '$4,500/mo',
      tags: JSON.stringify(['React', 'TypeScript', 'Tailwind']),
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-08-30'),
      applicationDeadline: new Date('2024-05-15'),
      status: 'active'
    }
  });

  await prisma.internship.create({
    data: {
      companyId: company2.id,
      title: 'UI/UX Intern',
      description: 'Design beautiful user interfaces.',
      domain: 'Product Design',
      locationType: 'Remote',
      durationWeeks: 8,
      stipend: '$3,000/mo',
      tags: JSON.stringify(['Figma', 'Prototyping']),
      startDate: new Date('2024-06-15'),
      endDate: new Date('2024-08-15'),
      applicationDeadline: new Date('2024-05-20'),
      status: 'active'
    }
  });

  await prisma.internship.create({
    data: {
      companyId: company1.id,
      title: 'Data Analyst Intern',
      description: 'Analyze large datasets to find patterns.',
      domain: 'Data Science',
      locationType: 'On-site',
      durationWeeks: 16,
      stipend: '$5,000/mo',
      tags: JSON.stringify(['Python', 'SQL', 'Tableau']),
      startDate: new Date('2024-07-01'),
      endDate: new Date('2024-10-31'),
      applicationDeadline: new Date('2024-06-10'),
      status: 'active'
    }
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
