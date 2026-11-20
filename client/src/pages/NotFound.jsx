import { Link } from "react-router-dom";
import { Sprout } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md py-24 text-center">
      <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-leaf-100 text-leaf-700">
        <Sprout size={30} aria-hidden="true" />
      </div>
      <p className="eyebrow mb-3">Error 404</p>
      <h1 className="text-4xl">This page hasn't sprouted</h1>
      <p className="mt-4 text-muted">The page you're looking for doesn't exist, or it may have moved.</p>
      <Link to="/" className="btn btn-primary mt-8">
        Back to the garden
      </Link>
    </div>
  );
}
