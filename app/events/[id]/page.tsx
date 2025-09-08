import pool from "@/lib/db";
import { Event } from "@/types/events";
import { notFound } from "next/navigation";

async function getEvent(id: number): Promise<Event | null> {
  const [rows] = await pool.query("SELECT * FROM events WHERE id = ?", [id]);
  const events = rows as Event[];
  return events.length > 0 ? events[0] : null;
}

export default async function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const event = await getEvent(Number(params.id));
  if (!event) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <p className="mb-4">{event.description}</p>
      <p className="text-sm text-gray-600">
        📍 {event.location} | {new Date(event.date).toLocaleString()}
      </p>
    </div>
  );
}
