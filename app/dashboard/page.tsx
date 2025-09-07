import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p className="text-muted-foreground mb-8">
          Welcome to your event management dashboard! You are authenticated as
          user: {userId}
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
            <p className="text-3xl font-bold text-primary">0</p>
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
