import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Quote from "../components/Quote";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <Navbar dark />
      <Hero />
      <Categories />
      <Quote />
      <Footer dark />
    </div>
  );
}
