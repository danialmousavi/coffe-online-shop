import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { userAuth } from "@/utils/userAuth";
import { valiadtePhone, valiadteEmail } from "@/utils/auth"; 

export async function POST(req) {
  try {
    await connectToDB();
    const user = await userAuth();
    const body = await req.json();
    const { name, email, phone } = body;

    // === Validation ===
    const errors = [];

    // Name validation → فقط حروف فارسی/لاتین + فاصله + حداقل 2 کاراکتر
    const nameRegex = /^[\p{L}\s'-]{2,50}$/u;
    if (!name || !nameRegex.test(String(name).trim())) {
      errors.push({
        field: "name",
        message:
          "نام باید فقط شامل حروف (فارسی یا لاتین) و فاصله باشد و حداقل ۲ کاراکتر داشته باشد.",
      });
    }

    if (!valiadteEmail(email)) {
      errors.push({ field: "email", message: "ایمیل معتبر نیست." });
    }

    if (!valiadtePhone(phone)) {
      errors.push({ field: "phone", message: "شماره موبایل معتبر نیست." });
    }

    if (errors.length > 0) {
      return Response.json(
        { message: "Validation failed", errors },
        { status: 422 }
      );
    }

    // === Update user ===
    await UserModel.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          name,
          email,
          phone
        },
      }
    );

    return Response.json(
      { message: "User updated successfully :))" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Update user error:", err);
    return Response.json({ message: String(err) }, { status: 500 });
  }
}
