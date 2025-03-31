import Worker from "@/app/models/worker";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {   
    await dbConnect();
    const workers = await Worker.find();
    return NextResponse.json(workers);
}

export async function POST(request: NextRequest) {
    await dbConnect();

    const body = await request.json();
    debugger;
    const worker = await Worker.create(body.body);
    return NextResponse.json(worker);
}