import connectToDB from "@/configs/db";
import userModel from "@/models/User";

export async function PUT(req) {
  try {
    connectToDB();
    const reqBody = await req.json();
    const { id } = reqBody;

    const user = await userModel.findOne({ _id: id }).lean();
    await userModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          role: user.role === "USER" ? "ADMIN" : "USER",
        },
      }
    );
    return Response.json({ message: "User role updated successfully" });
  } catch (error) {
    return Response.json(
      { message: "there is a server error", error },
      { status: 500 }
    );
  }
}
