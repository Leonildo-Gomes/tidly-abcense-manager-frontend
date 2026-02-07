
import Features from "./_components/features";
import Footer from "./_components/footer";
import Header from "./_components/header";
import Hero from "./_components/hero";
import Pricing from "./_components/pricing";
import Testimonials from "./_components/testimonal";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <Footer />
    </div>
  );
}
