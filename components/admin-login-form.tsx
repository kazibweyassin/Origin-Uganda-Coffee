"use client";

import { useActionState } from "react";
import { LockKeyhole } from "lucide-react";
import { loginAdmin, type LoginState } from "@/app/admin/auth-actions";

const initial: LoginState = { message: "" };

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(loginAdmin, initial);
  return <form action={action} className="admin-login-form"><div className="login-icon"><LockKeyhole/></div><div><p className="eyebrow">Restricted access</p><h1>Origin desk sign in</h1><p>Use your authorised administrator account to continue.</p></div><label><span>Business email</span><input name="email" type="email" autoComplete="username" required/></label><label><span>Password</span><input name="password" type="password" autoComplete="current-password" minLength={8} required/></label>{state.message&&<p className="login-error" role="alert">{state.message}</p>}<button className="button button-copper" disabled={pending}>{pending?"Signing in…":"Sign in securely"}</button><small>Sessions expire automatically after seven days.</small></form>;
}
