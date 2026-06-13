import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: projects });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Temporary POST method to seed data
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    
    // Check if it's an array for seeding
    if (Array.isArray(body)) {
      const projects = await Project.insertMany(body);
      return NextResponse.json({ success: true, message: 'Seeded successfully', data: projects }, { status: 201 });
    }

    const project = await Project.create(body);
    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
