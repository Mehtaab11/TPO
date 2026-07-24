'use server';

import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { ApplicationStatus } from '@prisma/client';

export async function applyToJobDrive(studentId?: string, jobId?: string) {
  const session = await getSession();
  if (!session || session.role !== 'STUDENT') {
    return { error: 'Unauthorized: Only students can apply for placement drives.' };
  }

  const sId = studentId || session.studentId;
  if (!sId || !jobId) {
    return { error: 'Invalid application request. Student profile or Drive ID missing.' };
  }

  try {
    // 1. Fetch Student Profile
    const student = await db.studentProfile.findUnique({
      where: { id: sId },
    });

    if (!student) {
      return { error: 'Student profile not found. Please complete your academic profile.' };
    }

    // 2. Fetch Job Posting
    const job = await db.jobPosting.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return { error: 'Campus Placement Drive not found.' };
    }

    // 3. Check Drive Status
    if (job.status !== 'OPEN') {
      return { error: `Drive is not accepting applications (Current status: ${job.status}).` };
    }

    // 4. Check Deadline
    const now = new Date();
    if (new Date(job.deadline) < now) {
      return { error: 'Application deadline for this drive has already passed.' };
    }

    // 5. Server-Side Eligibility Validation
    // CGPA Check
    if (student.cgpa < job.minCgpa) {
      return {
        error: `Ineligible: Minimum CGPA required is ${job.minCgpa.toFixed(2)}, but your CGPA is ${student.cgpa.toFixed(2)}.`,
      };
    }

    // Backlog Check
    if (student.backlogs > job.maxBacklogs) {
      return {
        error: `Ineligible: Maximum active backlogs allowed is ${job.maxBacklogs}, but you have ${student.backlogs} backlog(s).`,
      };
    }

    // Branch Check
    const allowed = job.allowedBranches.map((b) => b.trim().toUpperCase());
    const studentBranch = student.branch.trim().toUpperCase();

    if (allowed.length > 0 && !allowed.includes('ALL') && !allowed.includes(studentBranch)) {
      return {
        error: `Ineligible: Branch '${student.branch}' is not in the allowed list (${job.allowedBranches.join(', ')}).`,
      };
    }

    // 6. Check for existing application
    const existing = await db.application.findUnique({
      where: {
        jobId_studentId: {
          jobId,
          studentId: sId,
        },
      },
    });

    if (existing) {
      return { error: 'You have already submitted an application for this placement drive.' };
    }

    // 7. Create Application
    const application = await db.application.create({
      data: {
        jobId,
        studentId: sId,
        status: 'APPLIED',
      },
    });

    revalidatePath('/student/drives');
    revalidatePath('/student/applications');
    revalidatePath(`/recruiter/jobs/${jobId}/applicants`);

    return { success: true, application };
  } catch (error: any) {
    console.error('Apply to Job Drive Error:', error);
    return { error: error.message || 'Failed to submit application' };
  }
}

export async function updateApplicationStatus(applicationId: string, newStatus: ApplicationStatus) {
  const session = await getSession();
  if (!session || (session.role !== 'RECRUITER' && session.role !== 'ADMIN')) {
    return { error: 'Unauthorized: Only recruiters or admins can update candidate status.' };
  }

  try {
    const updated = await db.application.update({
      where: { id: applicationId },
      data: { status: newStatus },
    });

    revalidatePath('/recruiter');
    revalidatePath('/admin');
    revalidatePath('/student/applications');

    return { success: true, application: updated };
  } catch (error: any) {
    console.error('Update Application Status Error:', error);
    return { error: error.message || 'Failed to update application status' };
  }
}

export async function bulkUpdateApplicationStatus(applicationIds: string[], newStatus: ApplicationStatus) {
  const session = await getSession();
  if (!session || (session.role !== 'RECRUITER' && session.role !== 'ADMIN')) {
    return { error: 'Unauthorized' };
  }

  try {
    await db.application.updateMany({
      where: {
        id: { in: applicationIds },
      },
      data: {
        status: newStatus,
      },
    });

    revalidatePath('/recruiter');
    revalidatePath('/admin');
    revalidatePath('/student/applications');

    return { success: true, count: applicationIds.length };
  } catch (error: any) {
    console.error('Bulk Update Error:', error);
    return { error: error.message || 'Failed bulk update' };
  }
}
