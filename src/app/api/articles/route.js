import connectToDB from "@/configs/db";
import articleModel from "@/models/Article";
import { userAuth } from "@/utils/userAuth";

export async function POST(req) {
  try {
    connectToDB();
    const user = await userAuth();

    // ✅ Permission check
    if (!user || user.role !== "ADMIN") {
      return Response.json(
        { message: "You don’t have permission to access this route." },
        { status: 403 } // use 403 for forbidden, not 500
      );
    }

    const reqBody = await req.json();
    const { title, body, shortDescription } = reqBody;

    if (!title || !body || !shortDescription) {
      return Response.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    const newArticle = await articleModel.create({
      title,
      body,
      shortDescription,
      creator: user._id,
    });

    return Response.json(
      {
        message: "Article created successfully.",
        article: newArticle,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating article:", error);
    return Response.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    connectToDB();
    const articles = await articleModel.find({});
    return Response.json(articles);
  } catch (error) {
    console.error("Error creating article:", error);
    return Response.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
