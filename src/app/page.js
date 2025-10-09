import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Articles from "@/components/templates/index/articles/Articles";
import Banner from "@/components/templates/index/banner/Banner";
import Latest from "@/components/templates/index/latest/Latest";
import Promote from "@/components/templates/index/promote/Promote";
import connectToDB from "@/configs/db";
import productModel from "@/models/Product";
import { userAuth } from "@/utils/userAuth";

export default async function Home() {
  const user=await userAuth()
  connectToDB();
  const products=await productModel.find({},"-comments").sort({_id:-1}).limit(8).lean();
  console.log("productssssssss",products);
  
  return (
    <>
      <Navbar user={JSON.parse(JSON.stringify(user))} />
      <Banner />
      <Latest products={JSON.parse(JSON.stringify(products))}/>
      <Promote />
      <Articles />
      <Footer />
    </>
  );
}
