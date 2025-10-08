import productModel from "@/models/Product";
import { isValidObjectId } from "mongoose";

export async function DELETE(req,{params}) {
    try {
            const {id}=params;
    const isValidProductID=isValidObjectId(id);
    console.log("isValidProductID=>>>>>>>>>>>>>>>>",isValidProductID);
    if(isValidProductID){
        await productModel.findOneAndDelete({_id:id})
        return Response.json({message:"product delted successfully"})
    }
    } catch (error) {
    return Response.json({message:"server error"},{status:500})
        
    }
}