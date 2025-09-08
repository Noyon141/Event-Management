import { addEvent, getEvents } from "@/lib/temp-storage";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { title, description, date, location, status } = body;

    if (!title || !date || !location) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Determine status based on date if not provided
    const eventDate = new Date(date);
    const now = new Date();
    const defaultStatus = eventDate > now ? "upcoming" : "completed";

    // Use temporary storage for now (bypass database completely)
    const newEvent = addEvent({
      title,
      description,
      date,
      location,
      status: status || defaultStatus,
    });

    return NextResponse.json(
      { message: "Event created successfully", event: newEvent },
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
