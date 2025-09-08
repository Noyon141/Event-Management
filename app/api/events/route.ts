import { addEvent, getEvents, tempEvents } from "@/lib/temp-storage";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { title, description, date, location } = body;

    if (!title || !date || !location) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Use temporary storage for now (bypass database completely)
    const newEvent = {
      id: tempEvents.length + 1,
      title,
      description,
      date,
      location,
      created_at: new Date().toISOString(),
    };

    addEvent(newEvent);

    return NextResponse.json(
      { message: "Event created successfully", id: newEvent.id },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Return temporary storage events
    return NextResponse.json(getEvents());
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
