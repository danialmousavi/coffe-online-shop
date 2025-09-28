import connectToDB from "@/configs/db";
import WishlistModel from "@/models/Wishlist";

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

     connectToDB();

    const res = await WishlistModel.findOneAndDelete({ _id: id });

    if (!res) {
      return Response.json(
        { message: `هیچ محصولی با آیدی ${id} پیدا نشد` },
        { status: 404 }
      );
    }

    return Response.json(
      { message: `محصول شماره ${id} از علاقه‌مندی با موفقیت حذف شد` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Wishlist DELETE error:", error);
    return Response.json(
      { message: "internal server error", error: error.message },
      { status: 500 }
    );
  }
}
