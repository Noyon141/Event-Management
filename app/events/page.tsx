import EventsContent from "@/components/events/events-content";
import pool from "@/lib/db";
import { Event } from "@/types/events";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function getEvents(): Promise<Event[]> {
  const [rows] = await pool.query("SELECT * FROM events ORDER BY date ASC");
  return rows as Event[];
}

export default async function EventsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const events = await getEvents();

  return <EventsContent events={events} />;
}
