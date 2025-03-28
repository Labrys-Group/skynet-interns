import Project from "@/app/models/project";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await dbConnect();
    const projects = await Project.find();
    return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
    await dbConnect();
    const body = await request.json();
    const project = await Project.create(body);
    return NextResponse.json(project);
}