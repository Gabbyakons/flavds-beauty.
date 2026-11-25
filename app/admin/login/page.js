"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const r = await fetch("/api/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    if (r.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Wrong password. Try again.");
      setBusy(false);
    }
  }

  return (
    <main className="login">
      <form onSubmit={submit} className="panel">
        <p className="brand">Flav’Ds <span>Admin</span></p>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus required />
        </label>
        {error && <p className="err" role="alert">{error}</p>}
        <button className="btn btn-gold" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
      </form>
    </main>
  );
}
