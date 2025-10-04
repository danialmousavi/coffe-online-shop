import connectToDB from "@/configs/db";
import commentModel from "@/models/Comment";

export async function PUT(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { id } = body;
    // Validation (You)

    await commentModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          isAccept: true,
        },
      }
    );
    return Response.json({ message: "Comment accepted successfully :))" });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
