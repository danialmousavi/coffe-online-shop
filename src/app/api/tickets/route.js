import connectToDB from "@/configs/db";
import ticketModel from "@/models/Ticket";
import { userAuth } from "@/utils/userAuth";

export async function POST(req) {
  try {
    connectToDB();
    const user = await userAuth();
    const reqBody = await req.json();
    const { title, body, department, subDepartment, priority } = reqBody;
    //validation
    await ticketModel.create({
      title,
      body,
      department,
      subDepartment,
      priority,
      user: user._id,
    });
    return Response.json(
      { message: "ticket created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: `server error => ${error}` },
      { status: 500 }
    );
  }
}
