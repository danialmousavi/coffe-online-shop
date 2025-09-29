import DataTable from "@/components/templates/p-user/comments/DataTable";
import Layout from "@/components/layouts/UserPanelLayout";
import React from "react";
import connectToDB from "@/configs/db";
import commentModel from "@/models/Comment";
import { userAuth } from "@/utils/userAuth";
import { redirect } from "next/navigation";

const page = async () => {
  connectToDB();
  let comments=[]
  const user = await userAuth();
  if (user) {
   comments = await commentModel
      .find({ user: String(user._id) }, "-__v")
      .populate("productID", "name");
  }else{
    redirect("/login-register")
  }


  return (
    <Layout>
      <main>
        <DataTable
          comments={JSON.parse(JSON.stringify(comments))}
          title="لیست کامنت‌ها"
        />
        {/* <p className={styles.empty}>
          کامنتی وجود ندارد
        </p>  */}
      </main>
    </Layout>
  );
};

export default page;
