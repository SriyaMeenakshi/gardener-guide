import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/plants", label: "Garden Plants" },
  { to: "/plantcare", label: "Plant Care Tips" },
  { to: "/diy", label: "DIY Garden Ideas" },
  { to: "/methods", label: "Gardening Methods" },
];

export default function Navbar({ dark = false }) {
  const { user, loading, logout } = useAuth();
  const base = dark ? "text-white" : "text-gray-900";
  const linkClass = ({ isActive }) => `hover:text-green-600 ${isActive ? "text-green-600 font-semibold" : ""}`;

  return (
    <nav className={`flex flex-wrap items-center justify-between gap-3 p-6 ${base}`}>
      <Link to="/" className="text-2xl font-bold">
        GardenerGuide📗
      </Link>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} className={linkClass}>
            {l.label}
          </NavLink>
        ))}
        {!loading &&
          (user ? (
            <span className="flex items-center gap-3">
              <span className="text-green-600 font-medium">Hi, {user.name.split(" ")[0]}</span>
              <button onClick={logout} className="underline hover:text-green-600">
                Log out
              </button>
            </span>
          ) : (
            <span className="flex items-center gap-3">
              <NavLink to="/login" className={linkClass}>
                Log in
              </NavLink>
              <Link to="/register" className="bg-green-600 hover:bg-green-500 text-white px-4 py-1.5 rounded-md font-semibold">
                Sign up
              </Link>
            </span>
          ))}
      </div>
    </nav>
  );
}
