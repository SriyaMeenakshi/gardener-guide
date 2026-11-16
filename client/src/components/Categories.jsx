import { Link } from "react-router-dom";

const items = [
  { to: "/plants", title: "🏡 Plants for Your Home Garden 🌲", text: "Discover flowers, herbs, medicinal, and kitchen garden plants." },
  { to: "/plantcare", title: "💧 Plant Care Tips 👩‍🌾", text: "Learn how to properly water, fertilize, and maintain your plants." },
  { to: "/diy", title: "🎍 DIY Garden Ideas 🎋", text: "Build your own garden structures and decorations." },
  { to: "/methods", title: "🌱 Gardening Methods 🌳", text: "Explore different gardening techniques and methods." },
];

export default function Categories() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <Link key={item.to} to={item.to} className="block group">
            <div className="bg-white text-black p-8 rounded-2xl h-full border-4 border-transparent group-hover:border-green-500 transition-all shadow-md">
              <h2 className="text-2xl font-bold text-green-700 mb-3">{item.title}</h2>
              <p className="text-gray-600 font-medium">{item.text}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
