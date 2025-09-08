import pool from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
};

async function getEvents(): Promise<Event[]> {
  const [rows] = await pool.query("SELECT * FROM events ORDER BY date ASC");
  return rows as Event[];
}

export default async function EventsPage() {
  const { userId } = await auth();
  const events = await getEvents();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Events</h1>
        <p className="text-muted-foreground mb-8">
          Welcome to your event management dashboard! You are authenticated
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Total Events</h3>
            <p className="text-3xl font-bold text-primary">0</p>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Total Attendees</h3>
            <p className="text-3xl font-bold text-primary">0</p>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Upcoming Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((event) => (
                <div key={event.id} className="border p-4 rounded shadow">
                  <h2 className="text-xl font-semibold">{event.title}</h2>
                  <p>{event.description}</p>
                  <p className="text-sm text-gray-500">
                    📍 {event.location} |{" "}
                    {new Date(event.date).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <p className="text-muted-foreground">No recent activity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
