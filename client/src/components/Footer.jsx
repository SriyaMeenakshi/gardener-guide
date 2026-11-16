export default function Footer({ dark = false }) {
  return (
    <footer
      className={`text-center p-8 mt-12 border-t ${
        dark ? "border-gray-800 text-gray-400" : "border-gray-300 text-gray-600"
      }`}
    >
      <p className="mb-4">© {new Date().getFullYear()} Gardener Guide. All rights reserved.</p>
      <p className={`text-sm italic ${dark ? "text-gray-300" : "text-gray-700"}`}>
        Inspired by a childhood spent in the garden 🏡. Brought to life by Sriya Meenakshi.💚
      </p>
    </footer>
  );
}
