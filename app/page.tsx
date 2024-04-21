import Hero from "@/components/Hero";
import BuyTicket from "@/components/Home/BuyTicket";
import FAQSection from "@/components/Home/FAQSection";
import Organizers from "@/components/Organizers";
import Fellowship from "@/components/Fellowship";
import Schedule from "@/components/Schedule";
import Speakers from "@/components/Speakers";
import Sponsors from "@/components/Sponsors";
import Venue from "@/components/Venue";
import Welcome from "@/components/Welcome";
import MainLayout from "@/components/layout/MainLayout";
import Volunteers from "@/components/Volunteers";

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
      <MainLayout>
        <Organizers />
      </MainLayout>
      <MainLayout>
        <Fellowship />
      </MainLayout>
      <MainLayout>
        <Volunteers />
      </MainLayout>
      <BuyTicket />
      <MainLayout>
        <FAQSection />
      </MainLayout>
    </main>
  );
}
