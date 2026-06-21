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
    <Link href="/plantcare">
      <div className="p-6 rounded-xl bg-green-900 hover:bg-green-800 cursor-pointer">
        <h2>💧 Plant Care Tips 👩‍🌾</h2>
        <p>Learn how to properly water, fertilize, and maintain your plants.</p>
      </div>
    </Link>
      <Link href="/diy">
        <div className="p-6 rounded-xl bg-green-900 hover:bg-green-800 cursor-pointer">
          <h2>🎍 DIY Garden Ideas 🎋</h2>
          <p>Build your own garden structures and decorations.</p>
        </div>
      </Link>
      <Link href="/methods">
        <div className="p-6 rounded-xl bg-green-900 hover:bg-green-800 cursor-pointer">
          <h2>🌱 Gardening Methods 🌳</h2>
          <p>Explore different gardening techniques and methods.</p>
        </div>
      </Link>

    </div>
  );
}