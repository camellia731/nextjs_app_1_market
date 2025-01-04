import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const reqBody = await request.json();
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(context.params.id);
    if (singleItem.email !== reqBody.email) {
      return NextResponse.json({ message: "ほかの人が作成したアイテムです" });
    } else {
      await ItemModel.deleteOne({ _id: context.params.id });
      return NextResponse.json({ message: "アイテム削除成功" });
    }
  } catch {
    return NextResponse.json({ message: "アイテム削除失敗" });
  }
}
