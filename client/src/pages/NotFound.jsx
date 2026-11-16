import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center py-24">
      <h1 className="text-5xl font-bold">🥀 404</h1>
      <p className="mt-4 text-lg text-gray-700">That page doesn't exist.</p>
      <Link to="/" className="inline-block mt-6 text-green-700 underline">
        ← Back to home
      </Link>
    </div>
  );
}
