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

    const user = await userModel.findOne({ phone });
    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "کاربری با این شماره یافت نشد، ابتدا ثبت‌نام کنید",
        }),
        { status: 404 }
      );
    }

    // محدودیت ارسال مجدد (۶۰ ثانیه)
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

    // تولید و ذخیره کد OTP
    const code = Math.floor(10000 + Math.random() * 90000).toString();
    const expTime = Date.now() + 300_000;

    await OTP.create({ phone, code, expTime, times: 0 });

    // ارسال از طریق sms.ir
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
        message: "کد ورود ارسال شد",
        phone,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Login OTP Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "ارسال کد ورود با خطا مواجه شد",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
