import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Comment from "@/components/templates/article/comment/Comment";
import Details from "@/components/templates/article/details/Details";
import connectToDB from "@/configs/db";
import articleModel from "@/models/Article";
import styles from "@/styles/article.module.css";
import { userAuth } from "@/utils/userAuth";
import { notFound } from "next/navigation"; // 👈 اینو اضافه کن
import mongoose from "mongoose";

const page = async ({ params }) => {
  const user = await userAuth();
  const { id } = params;

  // ✅ بررسی معتبر بودن ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return notFound();
  }

  await connectToDB();
  const article = await articleModel
    .findOne({ _id: id })
    .populate("creator")
    .lean();

  // ✅ اگه مقاله پیدا نشد، بره 404
  if (!article) {
    return notFound();
  }

  return (
    <>
      <Navbar user={JSON.parse(JSON.stringify(user))} />
      <Breadcrumb route={"قهوه"} />
      <div className={styles.container}>
        <Details {...article} />
        {/* <Comment /> */}
      </div>
      <Footer />
    </>
  );
};

export default page;
