import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
import { SignJWT } from "jose";

export async function POST(request) {
  const reqBody = await request.json();
  try {
    await connectDB();
    const savedUserData = await UserModel.findOne({ email: reqBody.email });
    console.log(savedUserData);
    if (savedUserData) {
      if (savedUserData.password === reqBody.password) {
        const secretKey = new TextEncoder().encode("next-market-app-book");
        const payload = {
          email: reqBody.email,
        };
        const token = await new SignJWT(payload)
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime("24h")
          .sign(secretKey);
        return NextResponse.json({ message: "ログイン成功" , token: token});
      } else {
        return NextResponse.json({
          message: "ログイン失敗,パスワードが間違っています",
        });
      }
    } else {
      return NextResponse.json({
        message: "ログイン失敗,ユーザーが見つかりません",
      });
    }
  } catch {
    return NextResponse.json({ message: "ログイン失敗" });
  }
}
