import connectToDB from "@/configs/db";
import subDepartmentModel from "@/models/SubDepartment";
import { isValidObjectId } from "mongoose";

export async function GET(req,{params}) {
    try {
        connectToDB()
        const {id}=params;
        if(!isValidObjectId(id)){
            return Response.json({message:"id is not valid"},{status:422})
        }
        const subDepartments=await subDepartmentModel.find({department:id})
        return Response.json(subDepartments)
    } catch (error) {
        return Response.json({message:"server error"},{status:201})
    }
}