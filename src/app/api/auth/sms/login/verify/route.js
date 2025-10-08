import connectToDB from "@/configs/db";
import OTP from "@/models/Otp";
import userModel from "@/models/User";
import { generateAccessToken } from "@/utils/auth";

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const { phone, code } = body;
    console.log("body",body);
    
    if (!phone || !code) {
      return Response.json(
        { success: false, message: "شماره موبایل و کد الزامی هستند" },
        { status: 400 }
      );
    }

    const otp = await OTP.findOne({ phone, code });

    if (!otp) {
      return Response.json(
        { success: false, message: "کد اشتباه است" },
        { status: 409 }
      );
    }

    if (otp.expTime < Date.now()) {
      await OTP.deleteOne({ _id: otp._id });
      return Response.json(
        { success: false, message: "کد منقضی شده است" },
        { status: 410 }
      );
    }

    const user = await userModel.findOne({ phone });
    if (!user) {
      return Response.json(
        { success: false, message: "کاربری با این شماره یافت نشد" },
        { status: 404 }
      );
    }

    // حذف OTP پس از تأیید موفق
    await OTP.deleteOne({ _id: otp._id });

    // تولید توکن JWT
    const accessToken = generateAccessToken({ id: user._id, phone, email:user.email });
    const cookie = `token=${accessToken}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${
      7 * 24 * 60 * 60
    }; Secure`;

    return new Response(
      JSON.stringify({
        success: true,
        message: "ورود با موفقیت انجام شد",
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
    console.error("Verify login OTP Error:", error);
    return Response.json(
      { success: false, message: "خطا در تأیید کد", error: error.message },
      { status: 500 }
    );
  }
}
