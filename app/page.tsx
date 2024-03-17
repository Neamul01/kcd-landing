import Hero from "@/components/Hero";
import Speakers from "@/components/Speakers";
import Welcome from "@/components/Welcome";
import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <MainLayout>
        <Hero />
        <Welcome />
      </MainLayout>
      <Speakers />
    </main>
  );
}
