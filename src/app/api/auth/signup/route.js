import { generateAccessToken, hashPassword } from "@/utils/auth";
import connectToDB from "@/configs/db";
import userModel from "@/models/User";

export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { name, email, password, phone } = body;

    const isUserExist = await userModel.findOne({
      $or: [{ name }, { email }, { phone }],
    });
    if (isUserExist) {
      return Response.json(
        { message: "The user already exist" },
        { status: 422 }
      );
    }
    const hashedPassword = await hashPassword(password);
    const accessToken = generateAccessToken({ email });
    const users = await userModel.find({});

    await userModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: users.length > 0 ? "USER" : "ADMIN",
    });
    return Response.json(
      { message: "User signed up successfully :))" },
      {
        status: 201,
        headers: { "Set-Cookie": `token=${accessToken};path=/;httpOnly=true` },
      }
    );
  } catch (error) {
    console.log(error);
  }
}
