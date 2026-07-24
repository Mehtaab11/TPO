'use server';

import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export interface ScheduleInterviewInput {
  jobId: string;
  title: string;
  scheduledAt: string; // ISO date string
  location: string;
  notes?: string;
}

export async function scheduleInterview(input: ScheduleInterviewInput) {
  const session = await getSession();
  if (!session || (session.role !== 'RECRUITER' && session.role !== 'ADMIN')) {
    return { error: 'Unauthorized: Only recruiters or admins can schedule interviews.' };
  }

  try {
    const interview = await db.interview.create({
      data: {
        jobId: input.jobId,
        title: input.title,
        scheduledAt: new Date(input.scheduledAt),
        location: input.location,
        notes: input.notes,
      },
    });

    revalidatePath(`/recruiter/jobs/${input.jobId}/applicants`);
    revalidatePath('/student/applications');

    return { success: true, interview };
  } catch (error: any) {
    console.error('Schedule Interview Error:', error);
    return { error: error.message || 'Failed to schedule interview' };
  }
}

export async function getJobInterviews(jobId: string) {
  try {
    const interviews = await db.interview.findMany({
      where: { jobId },
      orderBy: { scheduledAt: 'asc' },
    });
    return interviews;
  } catch (error) {
    console.error('Get Job Interviews Error:', error);
    return [];
  }
}
