import connectToDB from "@/configs/db";
import userModel from "@/models/User";
import {
  generateAccessToken,
  generateRefreshToken,
  valiadteEmail,
  valiadtePassword,
  verifyPassword,
} from "@/utils/auth";

export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { email, password } = body;
    //validation
    const isValidEmail = valiadteEmail(email);
    const isValidPassword = valiadtePassword(password);
    if (!isValidEmail || !isValidPassword) {
      return Response.json(
        { message: "email or password is invalid" },
        { status: 204 }
      );
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return Response.json({ message: "user not found!" }, { status: 422 });
    }

    const iscorrectPasswordWithHash = await verifyPassword(password, user.password);
    if (!iscorrectPasswordWithHash) {
      return Response.json(
        { message: "email or password is not correct" },
        { status: 401 }
      );
    }

    const accessToken = generateAccessToken({ email });
    const refreshToken = generateRefreshToken({ email });
    await userModel.findOneAndUpdate(
      { email },
      {
        $set: {
          refreshToken,
        },
      }
    );
    return Response.json(
      { message: "user logged in successfully" },
      {
        status: 201,

        headers: {
          "Set-Cookie": `token=${accessToken};path=/;httpOnly=true`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}
