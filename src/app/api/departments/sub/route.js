import connectToDB from "@/configs/db";
import subDepartmentModel from "@/models/SubDepartment";

export async function POST(req) {
  try {
    connectToDB();
    const reqbody = await req.json();
    const { title, department } = reqbody;
    await subDepartmentModel.create({
      title,
      department,
    });
    return Response.json(
      { message: "subdepartment created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: `server error => ${error}` },
      { status: 500 }
    );
  }
}

