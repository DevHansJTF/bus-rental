import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Fleet } from "@/components/sections/Fleet";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTAFooter } from "@/components/layout/CTAFooter";
import { BookingModal } from "@/components/BookingModal";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Fleet />
      <WhyChooseUs />
      <Stats />
      <Testimonials />
      <CTAFooter />
      <BookingModal />
    </main>
  );
}
