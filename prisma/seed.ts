import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting TPO Portal database seeding...');

  // Password hash for all demo users: "password123"
  const passwordHash = await hash('password123', 10);

  // 1. Create Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@tpo.edu' },
    update: {},
    create: {
      email: 'admin@tpo.edu',
      password: passwordHash,
      role: 'ADMIN',
    },
  });
  console.log('✅ Created Admin user:', adminUser.email);

  // 2. Create Recruiter Users & Company Profiles
  const googleRecruiter = await prisma.user.upsert({
    where: { email: 'recruiter.google@tpo.edu' },
    update: {},
    create: {
      email: 'recruiter.google@tpo.edu',
      password: passwordHash,
      role: 'RECRUITER',
      companyProfile: {
        create: {
          companyName: 'Google Cloud',
          website: 'https://careers.google.com',
          industry: 'Software & Technology',
          description: 'Organizing the world\'s information and making it universally accessible.',
        },
      },
    },
    include: { companyProfile: true },
  });

  const msftRecruiter = await prisma.user.upsert({
    where: { email: 'recruiter.microsoft@tpo.edu' },
    update: {},
    create: {
      email: 'recruiter.microsoft@tpo.edu',
      password: passwordHash,
      role: 'RECRUITER',
      companyProfile: {
        create: {
          companyName: 'Microsoft India',
          website: 'https://careers.microsoft.com',
          industry: 'Enterprise Software & AI',
          description: 'Empowering every person and organization on the planet to achieve more.',
        },
      },
    },
    include: { companyProfile: true },
  });

  const tcsRecruiter = await prisma.user.upsert({
    where: { email: 'recruiter.tcs@tpo.edu' },
    update: {},
    create: {
      email: 'recruiter.tcs@tpo.edu',
      password: passwordHash,
      role: 'RECRUITER',
      companyProfile: {
        create: {
          companyName: 'TCS Digital',
          website: 'https://www.tcs.com',
          industry: 'IT Services & Consulting',
          description: 'Leading global IT services, consulting, and business solutions organization.',
        },
      },
    },
    include: { companyProfile: true },
  });

  console.log('✅ Created Recruiter profiles: Google, Microsoft, TCS');

  // 3. Create Student Users & Profiles
  const student1 = await prisma.user.upsert({
    where: { email: 'student.alex@tpo.edu' },
    update: {},
    create: {
      email: 'student.alex@tpo.edu',
      password: passwordHash,
      role: 'STUDENT',
      studentProfile: {
        create: {
          fullName: 'Alex Morgan',
          rollNumber: 'CS2026-042',
          branch: 'CSE',
          cgpa: 8.85,
          backlogs: 0,
          graduationYear: 2026,
          resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          skills: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Python'],
        },
      },
    },
    include: { studentProfile: true },
  });

  const student2 = await prisma.user.upsert({
    where: { email: 'student.sarah@tpo.edu' },
    update: {},
    create: {
      email: 'student.sarah@tpo.edu',
      password: passwordHash,
      role: 'STUDENT',
      studentProfile: {
        create: {
          fullName: 'Sarah Chen',
          rollNumber: 'ECE2026-015',
          branch: 'ECE',
          cgpa: 7.9,
          backlogs: 0,
          graduationYear: 2026,
          resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          skills: ['C++', 'Embedded Systems', 'VLSI', 'Python'],
        },
      },
    },
    include: { studentProfile: true },
  });

  const student3 = await prisma.user.upsert({
    where: { email: 'student.david@tpo.edu' },
    update: {},
    create: {
      email: 'student.david@tpo.edu',
      password: passwordHash,
      role: 'STUDENT',
      studentProfile: {
        create: {
          fullName: 'David Miller',
          rollNumber: 'ME2026-088',
          branch: 'MECH',
          cgpa: 6.8,
          backlogs: 1,
          graduationYear: 2026,
          resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          skills: ['AutoCAD', 'SolidWorks', 'Python', 'Thermal Engineering'],
        },
      },
    },
    include: { studentProfile: true },
  });

  const student4 = await prisma.user.upsert({
    where: { email: 'student.priya@tpo.edu' },
    update: {},
    create: {
      email: 'student.priya@tpo.edu',
      password: passwordHash,
      role: 'STUDENT',
      studentProfile: {
        create: {
          fullName: 'Priya Sharma',
          rollNumber: 'IT2026-004',
          branch: 'IT',
          cgpa: 9.4,
          backlogs: 0,
          graduationYear: 2026,
          resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          skills: ['Java', 'Spring Boot', 'System Design', 'Docker', 'Kubernetes'],
        },
      },
    },
    include: { studentProfile: true },
  });

  console.log('✅ Created Student profiles: Alex, Sarah, David, Priya');

  // 4. Create Job Postings
  if (googleRecruiter.companyProfile) {
    const googleJob = await prisma.jobPosting.create({
      data: {
        companyId: googleRecruiter.companyProfile.id,
        title: 'Software Development Engineer (SDE-1)',
        description: 'Join Google Cloud engineering team building next-generation distributed storage and ML platforms.',
        ctc: '24.5 LPA',
        minCgpa: 8.0,
        maxBacklogs: 0,
        allowedBranches: ['CSE', 'IT', 'ECE'],
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        status: 'OPEN',
      },
    });

    // Schedule Interview for Google Drive
    await prisma.interview.create({
      data: {
        jobId: googleJob.id,
        title: 'Round 1 - Technical Coding Assessment',
        scheduledAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        location: 'Online - Google Meet / Hackerrank',
        notes: '2 DSA problems focusing on Dynamic Programming and Graphs.',
      },
    });

    // Add Applications
    if (student1.studentProfile) {
      await prisma.application.create({
        data: {
          jobId: googleJob.id,
          studentId: student1.studentProfile.id,
          status: 'SHORTLISTED',
        },
      });
    }

    if (student4.studentProfile) {
      await prisma.application.create({
        data: {
          jobId: googleJob.id,
          studentId: student4.studentProfile.id,
          status: 'SELECTED',
        },
      });
    }
  }

  if (msftRecruiter.companyProfile) {
    const msftJob = await prisma.jobPosting.create({
      data: {
        companyId: msftRecruiter.companyProfile.id,
        title: 'Cloud & AI Systems Engineer',
        description: 'Work on Azure cloud services, large language models infrastructure, and microservices.',
        ctc: '22.0 LPA',
        minCgpa: 7.5,
        maxBacklogs: 0,
        allowedBranches: ['CSE', 'IT', 'ECE', 'EEE'],
        deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        status: 'OPEN',
      },
    });

    if (student1.studentProfile) {
      await prisma.application.create({
        data: {
          jobId: msftJob.id,
          studentId: student1.studentProfile.id,
          status: 'APPLIED',
        },
      });
    }

    if (student2.studentProfile) {
      await prisma.application.create({
        data: {
          jobId: msftJob.id,
          studentId: student2.studentProfile.id,
          status: 'SHORTLISTED',
        },
      });
    }
  }

  if (tcsRecruiter.companyProfile) {
    await prisma.jobPosting.create({
      data: {
        companyId: tcsRecruiter.companyProfile.id,
        title: 'Digital Systems Engineer & Innovator',
        description: 'Campus hiring drive for Digital and Ninja roles across enterprise software development.',
        ctc: '7.5 LPA',
        minCgpa: 6.5,
        maxBacklogs: 1,
        allowedBranches: ['ALL'],
        deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        status: 'OPEN',
      },
    });
  }

  console.log('✅ Created Job Postings, Applications, and Interviews');
  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
