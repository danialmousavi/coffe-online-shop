import connectToDB from "@/configs/db";
import WishlistModel from "@/models/Wishlist";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    await connectToDB();

    const body = await req.json();
    const { user, product } = body;

    if (!user || !product) {
      return Response.json({ message: "user and product are required" }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(user) || !mongoose.Types.ObjectId.isValid(product)) {
      return Response.json({ message: "user and product must be valid ObjectId" }, { status: 400 });
    }

    // use findOne (correct check)
    const exists = await WishlistModel.findOne({ user, product });
    if (exists) {
      return Response.json(
        { message: "this product has been added to wishlist before" },
        { status: 409 }
      );
    }

    const created = await WishlistModel.create({ user, product });

    return Response.json(
      { message: "product added to wishlist successfully", data: created },
      { status: 201 }
    );
  } catch (error) {
    // handle duplicate-key just in case of race condition
    if (error && error.code === 11000) {
      return Response.json(
        { message: "this product has been added to wishlist before" },
        { status: 409 }
      );
    }

    console.error("Wishlist POST error:", error);
    return Response.json(
      { message: "internal server error", error: error.message || error },
      { status: 500 }
    );
  }
}
