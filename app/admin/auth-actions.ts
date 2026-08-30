"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { createAdminSession, deleteAdminSession } from "@/lib/auth";
import { verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";

export type LoginState = { message: string };
const schema = z.object({ email: z.email().trim().toLowerCase(), password: z.string().min(8).max(200) });

export async function loginAdmin(_: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = schema.safeParse({ email: formData.get("email"), password: formData.get("password") });
  if (!parsed.success) return { message: "Enter a valid email and password." };
  try {
    const user = await prisma.adminUser.findUnique({ where: { email: parsed.data.email } });
    if (!user || !user.active || !(await verifyPassword(parsed.data.password, user.passwordHash))) return { message: "Invalid email or password." };
    await prisma.adminSession.deleteMany({ where: { expiresAt: { lt: new Date() } } });
    await createAdminSession(user.id);
  } catch {
    return { message: "Admin sign-in is unavailable. Check the database connection and migration." };
  }
  redirect("/admin");
}

export async function logoutAdmin() {
  await deleteAdminSession();
  redirect("/admin/login");
}
