import { NavLink, Link } from "react-router-dom";

const links = [
  { to: "/plants", label: "Garden Plants" },
  { to: "/plantcare", label: "Plant Care Tips" },
  { to: "/diy", label: "DIY Garden Ideas" },
  { to: "/methods", label: "Gardening Methods" },
];

export default function Navbar({ dark = false }) {
  const base = dark ? "text-white" : "text-gray-900";
  return (
    <nav className={`flex flex-wrap items-center justify-between gap-3 p-6 ${base}`}>
      <Link to="/" className="text-2xl font-bold">
        GardenerGuide📗
      </Link>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) => `hover:text-green-600 ${isActive ? "text-green-600 font-semibold" : ""}`}
          >
            {l.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
