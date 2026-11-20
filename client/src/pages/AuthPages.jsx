import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PageHeader } from "../components/Status";
import GoogleSignIn from "../components/GoogleSignIn";

const inputClass = "w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500";

function Field({ label, id, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input id={id} className={inputClass} required {...props} />
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
    <div className="max-w-md mx-auto">
      <PageHeader title={title} subtitle={subtitle} />
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-4">
        {children}
        {error && (
          <p role="alert" className="text-red-700 text-sm">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition"
        >
          {submitting ? "Please wait…" : submitLabel}
        </button>
      </form>
      {extra}
      <p className="text-center mt-4 text-gray-700">{footer}</p>
    </div>
  );
}

export function Login() {
  const { login } = useAuth();
  const location = useLocation();
  return (
    <AuthForm
      title="🌿 Welcome back"
      subtitle="Log in to your garden."
      submitLabel="Log in"
      extra={<GoogleSignIn />}
      onSubmit={(f) => login(f.get("email"), f.get("password"))}
      footer={
        <>
          New here?{" "}
          <Link to="/register" state={location.state} className="text-green-700 underline">
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
      title="🌱 Join Gardener Guide"
      subtitle="Create an account to save your plants."
      submitLabel="Create account"
      extra={<GoogleSignIn />}
      onSubmit={(f) => register(f.get("name"), f.get("email"), f.get("password"))}
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" state={location.state} className="text-green-700 underline">
            Log in
          </Link>
        </>
      }
    >
      <Field label="Name" id="name" name="name" type="text" autoComplete="name" maxLength={60} />
      <Field label="Email" id="email" name="email" type="email" autoComplete="email" />
      <Field
        label="Password (8+ characters)"
        id="password"
        name="password"
        type="password"
        autoComplete="new-password"
        minLength={8}
        maxLength={72}
      />
    </AuthForm>
  );
}
