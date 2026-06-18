import Link from "next/link";
export default function Categories() {
  return (
    <div className="grid grid-cols-2 gap-4 p-8">

      <Link href="/plants">
  <div className="p-6 rounded-xl bg-green-900 hover:bg-green-800 cursor-pointer">
    
    <h2>🏡Plants for Your Home Garden🌲</h2>
    <p>Discover flowers, herbs, medicinal, and kitchen garden plants.</p>
  </div>
</Link>

      <div>💧 Plant Care Tips 👩‍🌾</div>

      <div>🎍 DIY Garden Crafts 🎋</div>
      <div>🌱 Gardening Methods 🌳</div>

      

    </div>
  );
}