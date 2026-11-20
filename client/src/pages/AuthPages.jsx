import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Leaf, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import GoogleSignIn from "../components/GoogleSignIn";

function Field({ label, id, hint, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input id={id} className="input" required {...props} />
      {hint && <p className="mt-1.5 text-xs text-stone-500">{hint}</p>}
    </div>
  );
}

// Shared form shell: handles submit state, error display and the post-login redirect.
function AuthForm({ title, subtitle, submitLabel, onSubmit, children, footer, extra }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from || "/";
  // Already signed in (or just finished): go where they were headed.
  if (!loading && user) return <Navigate to={from} replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await onSubmit(new FormData(e.currentTarget));
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-md py-4 md:py-10">
      <div className="mb-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-leaf-600 text-white shadow-sm">
          <Leaf size={28} aria-hidden="true" />
        </span>
        <h1 className="mt-5 text-3xl md:text-4xl">{title}</h1>
        <p className="mt-3 text-muted">{subtitle}</p>
      </div>

      <div className="card p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {children}
          {error && (
            <p role="alert" className="rounded-xl bg-clay-50 px-4 py-3 text-sm text-clay-700">
              {error}
            </p>
          )}
          <button type="submit" disabled={submitting} className="btn btn-primary w-full !py-3">
            {submitting && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
            {submitting ? "Please wait…" : submitLabel}
          </button>
        </form>
        {extra}
      </div>

      <p className="mt-6 text-center text-sm text-muted">{footer}</p>
    </div>
  );
}

const linkClass = "font-semibold text-leaf-700 underline underline-offset-2 hover:text-leaf-900";

export function Login() {
  const { login } = useAuth();
  const location = useLocation();
  return (
    <AuthForm
      title="Welcome back"
      subtitle="Log in to see your garden."
      submitLabel="Log in"
      extra={<GoogleSignIn />}
      onSubmit={(f) => login(f.get("email"), f.get("password"))}
      footer={
        <>
          New here?{" "}
          <Link to="/register" state={location.state} className={linkClass}>
            Create an account
          </Link>
        </>
      }
    >
      <Field label="Email" id="email" name="email" type="email" autoComplete="email" />
      <Field label="Password" id="password" name="password" type="password" autoComplete="current-password" />
    </AuthForm>
  );
}

export function Register() {
  const { register } = useAuth();
  const location = useLocation();
  return (
    <AuthForm
      title="Join Gardener Guide"
      subtitle="Create a free account to save your plants and check your leaves."
      submitLabel="Create account"
      extra={<GoogleSignIn />}
      onSubmit={(f) => register(f.get("name"), f.get("email"), f.get("password"))}
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" state={location.state} className={linkClass}>
            Log in
          </Link>
        </>
      }
    >
      <Field label="Name" id="name" name="name" type="text" autoComplete="name" maxLength={60} />
      <Field label="Email" id="email" name="email" type="email" autoComplete="email" />
      <Field label="Password" id="password" name="password" type="password" autoComplete="new-password" minLength={8} maxLength={72} hint="At least 8 characters." />
    </AuthForm>
  );
}
