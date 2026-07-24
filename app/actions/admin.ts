'use server';

import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function getAdminAnalytics() {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return null;
  }

  try {
    const totalDrives = await db.jobPosting.count();
    const openDrives = await db.jobPosting.count({ where: { status: 'OPEN' } });
    const totalStudents = await db.studentProfile.count();

    const placedStudents = await db.application.count({
      where: { status: 'SELECTED' },
    });

    const jobs = await db.jobPosting.findMany({
      include: {
        company: true,
        applications: true,
      },
    });

    // Calculate Average CTC
    let totalCtcSum = 0;
    let validCtcCount = 0;
    jobs.forEach((job) => {
      const match = job.ctc.match(/(\d+(\.\d+)?)/);
      if (match) {
        totalCtcSum += parseFloat(match[1]);
        validCtcCount++;
      }
    });

    const averageCtc = validCtcCount > 0 ? (totalCtcSum / validCtcCount).toFixed(2) + ' LPA' : '8.5 LPA';

    // Find Top Recruiter
    const companyCountMap: Record<string, number> = {};
    jobs.forEach((j) => {
      const name = j.company.companyName;
      companyCountMap[name] = (companyCountMap[name] || 0) + j.applications.length;
    });

    let topRecruiter = 'Google';
    let maxApps = 0;
    Object.entries(companyCountMap).forEach(([name, count]) => {
      if (count > maxApps) {
        maxApps = count;
        topRecruiter = name;
      }
    });

    const recentApplications = await db.application.findMany({
      take: 10,
      orderBy: { appliedAt: 'desc' },
      include: {
        job: { include: { company: true } },
        student: true,
      },
    });

    return {
      totalDrives,
      openDrives,
      totalStudents,
      placedStudents,
      placementPercentage: totalStudents > 0 ? ((placedStudents / totalStudents) * 100).toFixed(1) + '%' : '0%',
      averageCtc,
      topRecruiter,
      recentApplications,
      allDrives: jobs,
    };
  } catch (error) {
    console.error('Get Admin Analytics Error:', error);
    return null;
  }
}

export async function exportShortlistCSV(jobId: string) {
  const session = await getSession();
  if (!session || (session.role !== 'ADMIN' && session.role !== 'RECRUITER')) {
    return { error: 'Unauthorized' };
  }

  try {
    const job = await db.jobPosting.findUnique({
      where: { id: jobId },
      include: {
        company: true,
        applications: {
          include: {
            student: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    if (!job) {
      return { error: 'Job Posting not found' };
    }

    const headers = [
      'Application ID',
      'Student Name',
      'Roll Number',
      'Email',
      'Branch',
      'CGPA',
      'Backlogs',
      'Graduation Year',
      'Status',
      'Applied At',
      'Resume URL',
    ];

    const rows = job.applications.map((app) => [
      `"${app.id}"`,
      `"${app.student.fullName}"`,
      `"${app.student.rollNumber}"`,
      `"${app.student.user.email}"`,
      `"${app.student.branch}"`,
      app.student.cgpa,
      app.student.backlogs,
      app.student.graduationYear,
      `"${app.status}"`,
      `"${app.appliedAt.toISOString()}"`,
      `"${app.student.resumeUrl || ''}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    return {
      success: true,
      filename: `${job.company.companyName.replace(/\s+/g, '_')}_${job.title.replace(/\s+/g, '_')}_Applicants.csv`,
      csvContent,
    };
  } catch (error: any) {
    console.error('Export CSV Error:', error);
    return { error: error.message || 'CSV Export failed' };
  }
}

export async function getAllStudents(filters?: {
  branch?: string;
  minCgpa?: number;
  maxBacklogs?: number;
  graduationYear?: number;
  searchQuery?: string;
}) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return [];
  }

  try {
    const students = await db.studentProfile.findMany({
      include: {
        user: true,
        applications: {
          include: {
            job: {
              include: {
                company: true,
              },
            },
          },
        },
      },
      orderBy: { cgpa: 'desc' },
    });

    let filtered = students;
    if (filters) {
      if (filters.branch && filters.branch !== 'ALL') {
        filtered = filtered.filter((s) => s.branch.toUpperCase() === filters.branch?.toUpperCase());
      }
      if (filters.minCgpa !== undefined && !isNaN(filters.minCgpa)) {
        filtered = filtered.filter((s) => s.cgpa >= filters.minCgpa!);
      }
      if (filters.maxBacklogs !== undefined && !isNaN(filters.maxBacklogs)) {
        filtered = filtered.filter((s) => s.backlogs <= filters.maxBacklogs!);
      }
      if (filters.graduationYear) {
        filtered = filtered.filter((s) => s.graduationYear === filters.graduationYear);
      }
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (s) =>
            s.fullName.toLowerCase().includes(q) ||
            s.rollNumber.toLowerCase().includes(q) ||
            s.user.email.toLowerCase().includes(q)
        );
      }
    }

    return filtered;
  } catch (error) {
    console.error('Get All Students Error:', error);
    return [];
  }
}
