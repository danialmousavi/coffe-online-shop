import connectToDB from "@/configs/db";
import otpModel from "@/models/Otp";
import userModel from "@/models/User";
import { generateAccessToken } from "@/utils/auth";

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const { phone, code, email, name } = body;

    if (!phone || !code) {
      return Response.json(
        { success: false, message: "شماره موبایل و کد الزامی هستند" },
        { status: 400 }
      );
    }

    const otp = await otpModel.findOne({ phone, code });

    if (!otp) {
      return Response.json(
        { success: false, message: "کد وارد شده اشتباه است" },
        { status: 409 }
      );
    }

    const now = Date.now();

    if (otp.expTime < now) {
      await otpModel.deleteOne({ _id: otp._id });
      return Response.json(
        { success: false, message: "کد منقضی شده است" },
        { status: 410 }
      );
    }

    // بررسی وجود کاربر
    let user = await userModel.findOne({ phone });

    if (!user) {
      const users = await userModel.countDocuments();
      user = await userModel.create({
        name: name || "کاربر جدید",
        email: email || "",
        phone,
        role: users === 0 ? "ADMIN" : "USER",
      });
    }

    // حذف OTP بعد از تأیید
    await otpModel.deleteOne({ _id: otp._id });

    // تولید توکن
    const accessToken = generateAccessToken({ email,phone });

    // ساخت کوکی امن
    const cookie = `token=${accessToken}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${
      7 * 24 * 60 * 60
    }; Secure`;

    return new Response(
      JSON.stringify({
        success: true,
        message: "کد تأیید شد و ورود با موفقیت انجام شد",
        user: { name: user.name, phone: user.phone, role: user.role },
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": cookie,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return Response.json(
      {
        success: false,
        message: "خطا در تأیید کد",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
