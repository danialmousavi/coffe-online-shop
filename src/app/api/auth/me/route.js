import connectToDB from "@/configs/db";
import userModel from "@/models/User";
import { verifyAccessToken } from "@/utils/auth";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    connectToDB();
    const token = cookies().get("token")?.value;
    let user = null;
    if (token) {
      const tokenPayload = verifyAccessToken(token);
      if (tokenPayload) {
        user = await userModel.findOne(
          { email: tokenPayload.email },
          "-password -refreshToken -__v"
        );
      }
      return Response.json(user);
    } else {
      return Response.json(
        { data: null, message: "no access" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log("errorrrrrrrrrrrrrrrrrrr",error);
    
  }
}
