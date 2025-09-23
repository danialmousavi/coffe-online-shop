import connectToDB from "@/configs/db";
import productModel from "@/models/Product";
import userModel from "@/models/User";

export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const {
      name,
      price,
      shortDescription,
      longDescription,
      weight,
      suitableFor,
      smell,
      tags,
      score,
    } = body;
    const product = await productModel.create({
      name,
      price,
      shortDescription,
      longDescription,
      weight,
      suitableFor,
      smell,
      tags,
      score,
    });
    return Response.json({
      message: "product created successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
  }
}
export async function GET(req) {
  try {
    connectToDB();
    const products =await productModel.find({},"-__v").populate("comments");
    console.log("products",products);
    
    return Response.json(products);
  } catch (error) {
    console.log(error);
    
  }
}
