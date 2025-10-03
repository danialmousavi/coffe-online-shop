import connectToDB from "@/configs/db"
import userModel from "@/models/User"
import { isValidObjectId } from "mongoose"

export async function DELETE(req,{params}) {
  try {
    connectToDB()
    const {id}=params
    if(!isValidObjectId(id)){
      return Response.json({message:"invalid id"},{status:401})
    }
    await userModel.findOneAndDelete({_id:id})
    return Response.json({message:"user deleted successfully"},{status:200})
  } catch (error) {
    return Response.json({message:"internal server error",error},{status:500})
    
  }
}