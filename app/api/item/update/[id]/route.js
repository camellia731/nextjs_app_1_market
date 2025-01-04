import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function PUT(request,context){
    const reqBody = await request.json()
    try {
        await connectDB()
        const singleItem = await ItemModel.findById(context.params.id)
        if (singleItem.email !== reqBody.email) {
            return NextResponse.json({message: "ほかの人が編集したアイテムです"})
        } else {
            await ItemModel.updateOne({_id: context.params.id}, reqBody)
            return NextResponse.json({message: "アイテム編集成功"})
        }
        
    } catch {
        return NextResponse.json({message: "アイテム編集失敗"})
    }
    
}