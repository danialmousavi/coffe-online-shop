import connectToDB from "@/configs/db";
import discountModel from "@/models/Discount";
import { userAuth } from "@/utils/userAuth";

export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { code, percent, maxUse } = body;
    const user=await userAuth();
    console.log(user);
    
    // Validation ✅
    if (!code || code.trim().length < 3) {
      return Response.json(
        { message: "کد تخفیف باید حداقل ۳ کاراکتر باشد." },
        { status: 400 }
      );
    }

    if (percent <= 0 || percent > 100) {
      return Response.json(
        { message: "درصد تخفیف باید بین ۱ تا ۱۰۰ باشد." },
        { status: 400 }
      );
    }

    if (maxUse <= 0) {
      return Response.json(
        { message: "حداکثر تعداد استفاده باید بزرگ‌تر از ۰ باشد." },
        { status: 400 }
      );
    }

    // اگر همه چیز اوکی بود -> ذخیره در دیتابیس
    await discountModel.create({
      code: code.trim(),
      percent,
      maxUse,
      user:user._id
    });

    return Response.json(
      { message: "کد تخفیف با موفقیت ساخته شد :))" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      { message: err.message || "خطای سرور" },
      { status: 500 }
    );
  }
}
    