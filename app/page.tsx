import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Quote from "@/components/Quote"; // If you are still using the quote component!
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <Navbar />
      <Hero />
      <Categories />
      <Quote />
      <Footer />
    </main>
  );
}