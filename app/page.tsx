import HomeContent from "@/components/home-content";
import { testDB } from "@/lib/test-db";

export default async function Home() {
  const dbTime = await testDB();

  return (
    <>
      <p>
        {dbTime
          ? `✅ Database Connected. Current DB Time: ${dbTime}`
          : "❌ Database not connected."}
      </p>
      <HomeContent />
    </>
  );
}
