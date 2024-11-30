import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Application from '@/models/Application';

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();

    const application = new Application({
      user: data.userId,
      jobTitle: data.jobTitle,
      company: data.company,
      jobDescription: data.jobDescription,
      applicationData: {
        resumeVersion: data.resumeVersion,
        coverLetter: data.coverLetter,
        answers: data.answers
      },
      source: {
        platform: data.platform,
        jobUrl: data.jobUrl
      }
    });

    await application.save();

    return NextResponse.json({ success: true, application });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const applications = await Application.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate('user', 'name email');

    return NextResponse.json({ applications });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}