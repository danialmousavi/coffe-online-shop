import connectToDB from "@/configs/db";
import WishlistModel from "@/models/Wishlist";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const { user, product } = body;

    // ولیدیشن
    if (!user || !product) {
      return Response.json(
        { message: "user and product are required" },
        { status: 400 }
      );
    }

    if (
      !mongoose.Types.ObjectId.isValid(user) ||
      !mongoose.Types.ObjectId.isValid(product)
    ) {
      return Response.json(
        { message: "user and product must be valid ObjectId" },
        { status: 400 }
      );
    }

    await WishlistModel.create({ user, product });

    return Response.json(
      { message: "product added to wishlist successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Wishlist POST error:", error);
    return Response.json(
      { message: "internal server error", error: error.message },
      { status: 500 }
    );
  }
}
