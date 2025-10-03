import connectToDB from "@/configs/db";
import userModel from "@/models/User";
import { isValidObjectId } from "mongoose";
import { hashPassword } from "@/utils/auth"; // فرض می‌کنم اینجا متدت ذخیره شده

export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    const { id } = params;

    if (!isValidObjectId(id)) {
      return Response.json({ message: "invalid id" }, { status: 400 });
    }

    await userModel.findOneAndDelete({ _id: id });
    return Response.json({ message: "user deleted successfully" }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "internal server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await connectToDB();
    const { id } = params;

    if (!isValidObjectId(id)) {
      return Response.json({ message: "invalid id" }, { status: 400 });
    }

    const body = await req.json();
    const { username, email, password, phone } = body;

    let updateFields = {
      ...(username && { name: username }),
      ...(email && { email }),
      ...(phone && { phone }),
    };

    // 🔹 اگر پسورد ارسال شد، هش کن
    if (password && password.trim() !== "") {
      const hashedPassword = await hashPassword(password);
      updateFields.password = hashedPassword;
    }

    const updatedUser = await userModel.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedUser) {
      return Response.json({ message: "user not found" }, { status: 404 });
    }

    return Response.json(
      { message: "user updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "internal server error", error: error.message },
      { status: 500 }
    );
  }
}
