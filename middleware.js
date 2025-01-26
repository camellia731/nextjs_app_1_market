import { NextResponse } from "next/server";
import { jetVerify, jwtVerify } from "jose";

export async function middleware(request) {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImR1bW15MUBnbWFpbC5jb20iLCJpYXQiOjE3MzU5NTcwNTksImV4cCI6MTczNjA0MzQ1OX0.IVFytXLTR9UUYFsmhE6oehme_rG56yg4rw2ekZgiB3s";
  // await request.headers.get("Authorization")?.split(" ")[1];
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
