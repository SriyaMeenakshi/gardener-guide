import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Leaf, LogOut, Menu, Sprout, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/plants", label: "Plants" },
  { to: "/plantcare", label: "Care tips" },
  { to: "/diy", label: "DIY" },
  { to: "/methods", label: "Methods" },
  { to: "/diagnose", label: "Plant Doctor" },
];

const linkClass = ({ isActive }) =>
  `rounded-full px-3.5 py-2 text-sm font-medium transition ${
    isActive ? "bg-leaf-100 text-leaf-900" : "text-stone-600 hover:bg-leaf-50 hover:text-leaf-800"
  }`;

function AuthArea({ onNavigate }) {
  const { user, loading, logout } = useAuth();
  if (loading) return <span className="h-9 w-24" aria-hidden="true" />;

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <NavLink to="/my-garden" onClick={onNavigate} className="btn btn-outline !py-2">
          <Sprout size={16} aria-hidden="true" /> My Garden
        </NavLink>
        <span
          title={user.name}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-leaf-600 text-sm font-semibold text-white"
          aria-label={`Signed in as ${user.name}`}
        >
          {user.name.trim().charAt(0).toUpperCase()}
        </span>
        <button onClick={() => { logout(); onNavigate?.(); }} className="rounded-full p-2 text-stone-500 transition hover:bg-leaf-50 hover:text-leaf-800" aria-label="Log out" title="Log out">
          <LogOut size={18} aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <NavLink to="/login" onClick={onNavigate} className="rounded-full px-4 py-2 text-sm font-semibold text-leaf-800 transition hover:bg-leaf-50">
        Log in
      </NavLink>
      <Link to="/register" onClick={onNavigate} className="btn btn-primary !py-2">
        Sign up
      </Link>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu whenever the page changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-leaf-100/80 bg-cream/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 font-display text-xl font-semibold text-leaf-950">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-leaf-600 text-white shadow-sm">
            <Leaf size={19} aria-hidden="true" />
          </span>
          Gardener Guide
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <AuthArea />
        </div>

        <button
          className="rounded-full p-2 text-leaf-900 transition hover:bg-leaf-50 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-leaf-100 bg-cream lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-3" aria-label="Main">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
            <div className="mt-2 border-t border-leaf-100 pt-3">
              <AuthArea onNavigate={() => setOpen(false)} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
