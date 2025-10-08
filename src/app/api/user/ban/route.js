import connectToDB from "@/configs/db";
import banModel from "@/models/Ban";

export async function POST(req) {
  const user = await userAuth();
  if (user.role != "ADMIN") {
    return Response.json(
      { message: "you dont have permission to access this route" },
      { status: 500 }
    );
  }
  try {
    connectToDB();
    const body = await req.json();
    const { phone, email } = body;
    await banModel.create({ phone, email });
    return Response.json(
      { message: "user banned successfully" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "internal server error", error },
      { status: 500 }
    );
  }
}
