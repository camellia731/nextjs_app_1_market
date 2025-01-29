import { NextResponse } from "next/server";
import { jetVerify, jwtVerify } from "jose";

export async function middleware(request) {
  const token = await request.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return new Response({ message: "Unauthorized" });
  }

  try {
    const secretKey = new TextEncoder().encode("next-market-app-book");
    const decodedJwt = await jwtVerify(token, secretKey);
    return await NextResponse.next();
  } catch {
    return new Response({ message: "トークンが正しくない" });
  }
}

export const config = {
  matcher: [
    "/api/item/create",
    "/api/item/delete/:path*",
    "/api/item/update/:path*",
  ],
};
