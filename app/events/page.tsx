import EventsContent from "@/components/events/events-content";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function EventsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return <EventsContent />;
}
