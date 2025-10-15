import connectToDB from "@/configs/db";
import articleModel from "@/models/Article";
import { userAuth } from "@/utils/userAuth";

export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    const user = await userAuth(req);

    if (!user || user.role !== "ADMIN") {
      return Response.json(
        { message: "You don’t have permission to delete articles." },
        { status: 403 }
      );
    }

    const { id } = params;

    // Check if article exists
    const article = await articleModel.find({_id:id});
    if (!article) {
      return Response.json({ message: "Article not found." }, { status: 404 });
    }

    await articleModel.findOneAndDelete(id);

    return Response.json(
      { message: "Article deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting article:", error);
    return Response.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
