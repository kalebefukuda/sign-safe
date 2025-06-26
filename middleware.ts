import { auth } from "./auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth();
  const pathname = req.nextUrl.pathname;

  // Bloqueia quem não está logado em rotas protegidas
  const protectedPaths = ["/dashboard", "/submit-expense"];
  if (protectedPaths.some((p) => pathname.startsWith(p))) {
    if (!session?.user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Bloqueia usuários comuns de acessarem rotas admin
  const adminPaths = ["/employees", "/pending-expenses", "/sign-expense", "/verify-signature"];
  if (adminPaths.some((p) => pathname.startsWith(p))) {
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}
