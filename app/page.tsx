import { testDB } from "@/lib/test-db";

export default async function Home() {
  await testDB();
  return (
    <>
      <main>Hello world</main>
    </>
  );
}
