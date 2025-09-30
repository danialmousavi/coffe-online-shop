import connectToDB from "@/configs/db";
import departmentModel from "@/models/Department";

export async function POST(req) {
  try {
    connectToDB();
    const reqbody = await req.json();
    const { title } = reqbody;
    //validation
    await departmentModel.create({
      title,
    });
    return Response.json({ message: "department created successfully" });
  } catch (error) {
    return Response.json(
      { message: `server error => ${error}` },
      { status: 500 }
    );
  }
}
