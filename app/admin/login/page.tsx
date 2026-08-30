import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin-login-form";
import { getAdminSession } from "@/lib/auth";

export const metadata: Metadata = { title: "Admin Sign In", robots: { index: false, follow: false } };

export default async function AdminLoginPage() {
  let hasSession = false;
  try { hasSession = Boolean(await getAdminSession()); } catch { /* form shows database guidance */ }
  if (hasSession) redirect("/admin");
  return <section className="admin-login-page"><Image src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2000&q=85" alt="Coffee operations workspace" fill priority sizes="100vw"/><div className="admin-login-overlay"/><div className="shell admin-login-shell"><AdminLoginForm/></div></section>;
}
