import connectToDB from "@/configs/db";
import commentModel from "@/models/Comment";
import productModel from "@/models/Product";

export async function POST(req) {
  try {
    await connectToDB();
    const reqBody = await req.json();
    const { username, body, email, score, productID } = reqBody;

    // --- Validation ---
    if (!username || typeof username !== "string" || username.trim().length < 3) {
      return Response.json({ message: "Username is required (min 3 chars)" }, { status: 400 });
    }

    if (!body || typeof body !== "string" || body.trim().length < 5) {
      return Response.json({ message: "Comment body is required (min 5 chars)" }, { status: 400 });
    }

    if (
      !email ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return Response.json({ message: "Invalid email" }, { status: 400 });
    }

    if (
      score === undefined ||
      typeof score !== "number" ||
      score < 1 ||
      score > 5
    ) {
      return Response.json({ message: "Score must be a number between 1 and 5" }, { status: 400 });
    }

    if (
      !productID ||
      typeof productID !== "string" ||
      !/^[0-9a-fA-F]{24}$/.test(productID) // چک کردن اینکه MongoDB ObjectId باشه
    ) {
      return Response.json({ message: "Invalid product ID" }, { status: 400 });
    }

    // --- Create comment ---
    const comment = await commentModel.create({
      username,
      body,
      email,
      score,
      productID,
    });

    // --- Update product ---
    await productModel.findOneAndUpdate(
      { _id: productID },
      { $push: { comments: comment._id } }
    );

    return Response.json(
      {
        message: "Comment created successfully",
        data: comment,
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: error.message || "Server error" }, { status: 500 });
  }
}

export async function GET() {
  const comments = await commentModel.find({}, "-__v");
  return Response.json(comments);
}
