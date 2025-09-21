import connectToDB from "@/configs/db";
import userModel from "@/models/User";
import { cookies } from "next/headers";
import { verifyAccessToken } from "./auth";

export const userAuth = async () => {
  const token = cookies().get("token")?.value;
  let user = null;
  connectToDB();
  if (token) {
    const tokenPayload = verifyAccessToken(token);
    user = await userModel.findOne({ email: tokenPayload.email });
  }
  return user
};