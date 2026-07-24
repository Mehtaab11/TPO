'use server';

import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { DriveStatus } from '@prisma/client';

export interface CreateJobPostingInput {
  title: string;
  description: string;
  ctc: string;
  minCgpa: number;
  maxBacklogs: number;
  allowedBranches: string[];
  deadline: string; // ISO date string
}

export async function createJobPosting(input: CreateJobPostingInput) {
  const session = await getSession();
  if (!session || (session.role !== 'RECRUITER' && session.role !== 'ADMIN')) {
    return { error: 'Unauthorized: Only recruiters or admins can create job drives.' };
  }

  try {
    let companyId = session.companyId;

    if (!companyId && session.role === 'ADMIN') {
      // Find or create default TPO Admin company profile
      let adminCompany = await db.companyProfile.findFirst({
        where: { companyName: 'TPO Placement Office' },
      });

      if (!adminCompany) {
        adminCompany = await db.companyProfile.create({
          data: {
            userId: session.userId,
            companyName: 'TPO Placement Office',
            website: 'https://tpo.edu',
            industry: 'Education & Training',
            description: 'Campus Placement Office Direct Drive',
          },
        });
      }
      companyId = adminCompany.id;
    }

    if (!companyId) {
      return { error: 'Company profile not found. Please register as a Recruiter.' };
    }

    const job = await db.jobPosting.create({
      data: {
        companyId,
        title: input.title,
        description: input.description,
        ctc: input.ctc,
        minCgpa: input.minCgpa,
        maxBacklogs: input.maxBacklogs,
        allowedBranches: input.allowedBranches,
        deadline: new Date(input.deadline),
        status: 'OPEN',
      },
    });

    revalidatePath('/student/drives');
    revalidatePath('/recruiter');
    revalidatePath('/admin/drives');

    return { success: true, job };
  } catch (error: any) {
    console.error('Create Job Error:', error);
    return { error: error.message || 'Failed to create job posting' };
  }
}

export async function updateJobPostingStatus(jobId: string, status: DriveStatus) {
  const session = await getSession();
  if (!session || (session.role !== 'RECRUITER' && session.role !== 'ADMIN')) {
    return { error: 'Unauthorized' };
  }

  try {
    const updated = await db.jobPosting.update({
      where: { id: jobId },
      data: { status },
    });

    revalidatePath('/student/drives');
    revalidatePath('/recruiter');
    revalidatePath('/admin/drives');

    return { success: true, job: updated };
  } catch (error: any) {
    console.error('Update Job Status Error:', error);
    return { error: error.message || 'Failed to update drive status' };
  }
}

export async function getJobPostings() {
  try {
    const jobs = await db.jobPosting.findMany({
      include: {
        company: true,
        applications: {
          include: {
            student: true,
          },
        },
        interviews: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return jobs;
  } catch (error) {
    console.error('Get Job Postings Error:', error);
    return [];
  }
}
