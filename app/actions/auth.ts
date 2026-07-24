'use server';

import { db } from '@/lib/db';
import { hashPassword, verifyPassword, createSession, clearSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Role } from '@prisma/client';

export async function registerUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = (formData.get('role') as Role) || 'STUDENT';

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  try {
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return { error: 'User with this email already exists' };
    }

    const hashedPassword = await hashPassword(password);

    if (role === 'STUDENT') {
      const fullName = formData.get('fullName') as string;
      const rollNumber = formData.get('rollNumber') as string;
      const branch = formData.get('branch') as string;
      const cgpa = parseFloat((formData.get('cgpa') as string) || '0');
      const backlogs = parseInt((formData.get('backlogs') as string) || '0', 10);
      const graduationYear = parseInt((formData.get('graduationYear') as string) || '2026', 10);

      if (!fullName || !rollNumber || !branch) {
        return { error: 'Full name, roll number, and branch are required for student registration' };
      }

      const user = await db.user.create({
        data: {
          email,
          password: hashedPassword,
          role: 'STUDENT',
          studentProfile: {
            create: {
              fullName,
              rollNumber,
              branch,
              cgpa,
              backlogs,
              graduationYear,
              skills: ['Problem Solving', 'Data Structures'],
            },
          },
        },
        include: { studentProfile: true },
      });

      await createSession({
        userId: user.id,
        email: user.email,
        role: user.role,
        fullName: user.studentProfile?.fullName,
        studentId: user.studentProfile?.id,
      });
    } else if (role === 'RECRUITER') {
      const companyName = formData.get('companyName') as string;
      const website = formData.get('website') as string || 'https://company.com';
      const industry = formData.get('industry') as string || 'Information Technology';
      const description = formData.get('description') as string || 'Leading technology solutions provider.';

      if (!companyName) {
        return { error: 'Company name is required for recruiter registration' };
      }

      const user = await db.user.create({
        data: {
          email,
          password: hashedPassword,
          role: 'RECRUITER',
          companyProfile: {
            create: {
              companyName,
              website,
              industry,
              description,
            },
          },
        },
        include: { companyProfile: true },
      });

      await createSession({
        userId: user.id,
        email: user.email,
        role: user.role,
        companyName: user.companyProfile?.companyName,
        companyId: user.companyProfile?.id,
      });
    } else {
      // ADMIN
      const user = await db.user.create({
        data: {
          email,
          password: hashedPassword,
          role: 'ADMIN',
        },
      });

      await createSession({
        userId: user.id,
        email: user.email,
        role: user.role,
      });
    }
  } catch (error: any) {
    console.error('Registration Error:', error);
    return { error: error.message || 'Registration failed' };
  }

  if (role === 'ADMIN') redirect('/admin');
  if (role === 'RECRUITER') redirect('/recruiter');
  redirect('/student');
}

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  try {
    const user = await db.user.findUnique({
      where: { email },
      include: {
        studentProfile: true,
        companyProfile: true,
      },
    });

    if (!user) {
      return { error: 'Invalid credentials' };
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return { error: 'Invalid credentials' };
    }

    await createSession({
      userId: user.id,
      email: user.email,
      role: user.role,
      fullName: user.studentProfile?.fullName,
      companyName: user.companyProfile?.companyName,
      studentId: user.studentProfile?.id,
      companyId: user.companyProfile?.id,
    });

    if (user.role === 'ADMIN') redirect('/admin');
    if (user.role === 'RECRUITER') redirect('/recruiter');
    redirect('/student');
  } catch (error: any) {
    if (error.digest?.startsWith('NEXT_REDIRECT')) throw error;
    console.error('Login Error:', error);
    return { error: error.message || 'Login failed' };
  }
}

export async function quickDemoLogin(role: Role) {
  try {
    let email = 'admin@tpo.edu';
    if (role === 'STUDENT') email = 'student.alex@tpo.edu';
    if (role === 'RECRUITER') email = 'recruiter.google@tpo.edu';

    const user = await db.user.findUnique({
      where: { email },
      include: {
        studentProfile: true,
        companyProfile: true,
      },
    });

    if (user) {
      await createSession({
        userId: user.id,
        email: user.email,
        role: user.role,
        fullName: user.studentProfile?.fullName,
        companyName: user.companyProfile?.companyName,
        studentId: user.studentProfile?.id,
        companyId: user.companyProfile?.id,
      });
    } else {
      // Fallback virtual demo session if DB seeding has not run yet
      await createSession({
        userId: `demo-${role.toLowerCase()}-id`,
        email: `${role.toLowerCase()}@tpo.edu`,
        role,
        fullName: role === 'STUDENT' ? 'Demo Student' : undefined,
        companyName: role === 'RECRUITER' ? 'Demo Tech Corp' : undefined,
        studentId: role === 'STUDENT' ? 'demo-student-id' : undefined,
        companyId: role === 'RECRUITER' ? 'demo-company-id' : undefined,
      });
    }
  } catch (e) {
    // Virtual fallback login session
    await createSession({
      userId: `demo-${role.toLowerCase()}-id`,
      email: `${role.toLowerCase()}@tpo.edu`,
      role,
      fullName: role === 'STUDENT' ? 'Demo Student' : undefined,
      companyName: role === 'RECRUITER' ? 'Demo Tech Corp' : undefined,
      studentId: role === 'STUDENT' ? 'demo-student-id' : undefined,
      companyId: role === 'RECRUITER' ? 'demo-company-id' : undefined,
    });
  }

  if (role === 'ADMIN') redirect('/admin');
  if (role === 'RECRUITER') redirect('/recruiter');
  redirect('/student');
}

export async function logoutUser() {
  await clearSession();
  redirect('/login');
}
