import { NextResponse } from "next/server";
import { jetVerify, jwtVerify } from "jose";

export async function middleware(request) {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImR1bW15QGdtYWlsLmNvbSIsImlhdCI6MTczNTk1MzM5MCwiZXhwIjoxNzM2MDM5NzkwfQ.H_CNIhX6-TEc7Z801CBm434SSGe4Bm4U8xtDQWmMe5c";
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
