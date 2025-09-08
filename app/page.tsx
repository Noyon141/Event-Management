import HomeContent from "@/components/home-content";
import { testDB } from "@/lib/test-db";

export default async function Home() {
  await testDB();

  return (
    <>
      <HomeContent />
    </>
  );
}
