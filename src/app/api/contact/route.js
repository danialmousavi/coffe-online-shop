import connectToDB from "@/configs/db";
import ContactModel from "@/models/Contact";

function validateContact({ name, email, company, phone, message }) {
  const errors = {};

  if (!name || name.trim().length < 3) {
    errors.name = "نام باید حداقل ۳ کاراکتر باشد";
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "ایمیل معتبر نیست";
  }

  if (phone && !/^[0-9+\-\s]{7,15}$/.test(phone)) {
    errors.phone = "شماره تلفن معتبر نیست";
  }

  if (!message || message.trim().length < 5) {
    errors.message = "پیام باید حداقل ۵ کاراکتر باشد";
  }

  return errors;
}

export async function POST(req) {
  try {
    await connectToDB();

    const body = await req.json();
    const { name, email, company, phone, message } = body;

    // ولیدیشن دستی
    const errors = validateContact({ name, email, company, phone, message });
    if (Object.keys(errors).length > 0) {
      return Response.json({ errors }, { status: 400 });
    }

    await ContactModel.create({
      name,
      email,
      company,
      phone,
      message,
    });

    return Response.json(
      { message: "پیام شما با موفقیت ثبت شد" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ message: "خطای سرور" }, { status: 500 });
  }
}
