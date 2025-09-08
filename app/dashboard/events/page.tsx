import DashboardContent from "@/components/admin/dashboard-content";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminEventsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <DashboardContent />;
}
