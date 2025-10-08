import connectToDB from "@/configs/db";
import commentModel from "@/models/Comment";
import { userAuth } from "@/utils/userAuth";

export async function PUT(req) {
    const user=await userAuth();
    if(user.role!="ADMIN"){
      return Response.json({message:"you dont have permission to access this route"},{status:500})
    }
  try {
    connectToDB();
    const body = await req.json();
    const { id } = body;
    // Validation (You)

    await commentModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          isAccept: false,
        },
      }
    );
    return Response.json({ message: "Comment accepted successfully :))" });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
