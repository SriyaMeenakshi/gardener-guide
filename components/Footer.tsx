export default function Footer() {
  return (
    <footer className="text-center p-8 mt-12 border-t border-gray-800 text-gray-400">
      <p className="mb-4">© {new Date().getFullYear()} Gardener Guide. All rights reserved.</p>
      
      <p className="text-sm italic text-gray-300">
        Inspired by a childhood spent in the garden 🏡. Brought to life by Sriya Meenakshi.💚
      </p>
      
      <p className="text-sm italic text-gray-300">
        Raised among the flowers 🌹. Designed with ❤️ by a lifelong gardener. 🌳
      </p> 
    </footer>
  );
}