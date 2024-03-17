import Hero from "@/components/Hero";
import Schedule from "@/components/Schedule";
import Speakers from "@/components/Speakers";
import Sponsors from "@/components/Sponsors";
import Venue from "@/components/Venue";
import Welcome from "@/components/Welcome";
import MainLayout from "@/components/layout/MainLayout";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <MainLayout>
        <Welcome />
      </MainLayout>
      <Speakers />
      <MainLayout>
        <Schedule />
      </MainLayout>
      <Venue />
      <Sponsors />
    </main>
  );
}
