import connectToDB from "@/configs/db";
import productModel from "@/models/Product";
import { isValidObjectId } from "mongoose";

// 🗑️ حذف محصول
export async function DELETE(req, { params }) {
  const { id } = params;
  connectToDB();
  if (!isValidObjectId(id)) {
    return Response.json(
      { message: "شناسه محصول معتبر نیست" },
      { status: 400 }
    );
  }

  try {
    const deleted = await productModel.findOneAndDelete({ _id: id });
    if (!deleted) {
      return Response.json({ message: "محصول پیدا نشد" }, { status: 404 });
    }
    return Response.json({ message: "محصول با موفقیت حذف شد" });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "خطای سرور" }, { status: 500 });
  }
}

// ✏️ ویرایش محصول بدون ولیدیشن
export async function PUT(req, { params }) {
  const { id } = params;
  connectToDB();
  if (!isValidObjectId(id)) {
    return Response.json(
      { message: "شناسه محصول معتبر نیست" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();

    // فقط فیلدهای قابل تغییر
    const updatedData = {
      name: body.name,
      price: body.price,
      score: body.score,
      smell: body.smell,
      suitableFor: body.suitableFor,
      weight: body.weight,
      shortDescription: body.shortDescription,
      longDescription: body.longDescription,
    };

    const updatedProduct = await productModel.findOneAndUpdate(
      { _id: id },
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return Response.json({ message: "محصول پیدا نشد" }, { status: 404 });
    }

    return Response.json({
      message: "محصول با موفقیت ویرایش شد",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "خطای سرور" }, { status: 500 });
  }
}
