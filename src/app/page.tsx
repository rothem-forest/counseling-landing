import Header from "@/components/layout/Header/Header";
import Hero from "@/components/sections/Hero/Hero";
import Services from "@/components/sections/Services/Services";
import Counselor from "@/components/sections/Counselor/Counselor";
import Reviews from "@/components/sections/Reviews/Reviews";
import Reservation from "@/components/sections/Reservation/Reservation";
import Blog from "@/components/sections/Blog/Blog";
import FAQ from "@/components/sections/FAQ/FAQ";
import Location from "@/components/sections/Location/Location";
import Footer from "@/components/layout/Footer/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <Counselor />
      <Reviews />
      <Reservation />
      <Blog />
      <FAQ />
      <Location />
      <Footer />
    </main>
  );
}
