import connectToDB from "@/configs/db";
import commentModel from "@/models/Comment";
import productModel from "@/models/Product";

export async function POST(req) {
  try {
    connectToDB();
    const reqBody = await req.json();
    const { username, body, email, score, productID } = reqBody;
    const comment = await commentModel.create({
      username,
      body,
      email,
      score,
      productID,
    });
    const updatedProduct = await productModel.findOneAndUpdate(
      {
        _id: productID,
      },
      {
        $push: {
          comments: comment._id,
        },
      }
    );
    return Response.json({
      message: "comment created successfully",
      data: comment,
    },{
        status:201
    });
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });

  }
}

export async function GET() {
  const comments = await commentModel.find({}, "-__v");
  return Response.json(comments);
}
