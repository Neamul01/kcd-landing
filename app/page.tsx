import Hero from "@/components/Hero";
import Schedule from "@/components/Schedule";
import Speakers from "@/components/Speakers";
import Welcome from "@/components/Welcome";
import MainLayout from "@/components/layout/MainLayout";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <MainLayout>
        <Hero />
        <Welcome />
      </MainLayout>
      <Speakers />
      <MainLayout>
        <Schedule />
      </MainLayout>
    </main>
  );
}
