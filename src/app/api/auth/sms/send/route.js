import connectToDB from "@/configs/db";
import OTP from "@/models/Otp";
import userModel from "@/models/User";

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const { phone } = body;

    if (!phone) {
      return new Response(
        JSON.stringify({ success: false, message: "شماره موبایل الزامی است" }),
        { status: 400 }
      );
    }

    // بررسی اینکه کاربر با این شماره وجود دارد
    const existingUser = await userModel.findOne({ phone });
    if (existingUser) {
      return new Response(
        JSON.stringify({
          success: true,
          exists: true,
          message: "این شماره قبلاً ثبت‌نام کرده است. لطفاً وارد شوید.",
        }),
        { status: 202 } // Accepted, باید لاگین کند
      );
    }

    // بررسی محدودیت 60 ثانیه
    const lastOtp = await OTP.findOne({ phone }).sort({ createdAt: -1 });
    if (lastOtp && Date.now() - lastOtp.expTime + 300000 < 60 * 1000) {
      const remaining = Math.ceil(
        (60 * 1000 - (Date.now() - (lastOtp.expTime - 300000))) / 1000
      );
      return new Response(
        JSON.stringify({
          success: false,
          message: `لطفاً ${remaining} ثانیه صبر کنید قبل از درخواست کد جدید`,
        }),
        { status: 429 }
      );
    }

    // تولید OTP جدید
    const code = Math.floor(10000 + Math.random() * 90000).toString();
    const now = new Date();
    const expTime = now.getTime() + 300_000; // 5 دقیقه بعد

    // ذخیره OTP در MongoDB
    await OTP.create({ phone, code, expTime, times: 0 });

    // ارسال از طریق sms.ir با fetch
    const smsResponse = await fetch("https://api.sms.ir/v1/send/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.SMSIR_API_KEY,
      },
      body: JSON.stringify({
        mobile: phone,
        templateId: parseInt(process.env.SMSIR_TEMPLATE_ID),
        parameters: [{ name: "CODE", value: code }],
      }),
    });

    const data = await smsResponse.json();
    console.log("SMS.ir Response:", data);

    if (!smsResponse.ok) {
      throw new Error(data.message || "SMS.ir request failed");
    }

    return new Response(
      JSON.stringify({
        success: true,
        exists: false,
        message: "کد تایید ارسال شد",
        phone,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending OTP:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "ارسال کد تایید با خطا مواجه شد",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
