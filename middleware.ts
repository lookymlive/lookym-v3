// middleware.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth(async (req) => {
  const session = await auth()
  if (!session && req.nextUrl.pathname.startsWith("/(private-route)")) { // Asegúrate de usar el nombre de ruta correcto
    return NextResponse.redirect(new URL("/(guest-route)/sign-in", req.url)); // Redirige al login
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/(private-route)/(.*)"], // Solo aplica el middleware a las rutas dentro de (private-route)
};