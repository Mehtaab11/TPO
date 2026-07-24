'use server';

import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export interface UpdateStudentProfileInput {
  fullName: string;
  rollNumber: string;
  branch: string;
  cgpa: number;
  backlogs: number;
  graduationYear: number;
  resumeUrl?: string;
  skills: string[];
}

export async function updateStudentProfile(input: UpdateStudentProfileInput) {
  const session = await getSession();
  if (!session || session.role !== 'STUDENT') {
    return { error: 'Unauthorized: Only students can update their profile.' };
  }

  try {
    const student = await db.studentProfile.upsert({
      where: { userId: session.userId },
      update: {
        fullName: input.fullName,
        rollNumber: input.rollNumber,
        branch: input.branch,
        cgpa: input.cgpa,
        backlogs: input.backlogs,
        graduationYear: input.graduationYear,
        resumeUrl: input.resumeUrl,
        skills: input.skills,
      },
      create: {
        userId: session.userId,
        fullName: input.fullName,
        rollNumber: input.rollNumber,
        branch: input.branch,
        cgpa: input.cgpa,
        backlogs: input.backlogs,
        graduationYear: input.graduationYear,
        resumeUrl: input.resumeUrl,
        skills: input.skills,
      },
    });

    revalidatePath('/student');
    revalidatePath('/student/profile');
    revalidatePath('/student/drives');

    return { success: true, student };
  } catch (error: any) {
    console.error('Update Student Profile Error:', error);
    return { error: error.message || 'Failed to update student profile' };
  }
}

export async function getStudentDashboardData() {
  const session = await getSession();
  if (!session) return null;

  try {
    const student = await db.studentProfile.findUnique({
      where: { userId: session.userId },
      include: {
        applications: {
          include: {
            job: {
              include: {
                company: true,
                interviews: true,
              },
            },
          },
          orderBy: { appliedAt: 'desc' },
        },
      },
    });

    const openJobs = await db.jobPosting.findMany({
      where: { status: 'OPEN' },
      include: {
        company: true,
        applications: true,
      },
      orderBy: { deadline: 'asc' },
    });

    return {
      student,
      openJobs,
    };
  } catch (error) {
    console.error('Get Student Dashboard Error:', error);
    return null;
  }
}
