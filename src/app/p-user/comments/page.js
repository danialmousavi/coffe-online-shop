import DataTable from "@/components/templates/p-user/comments/DataTable";
import Layout from "@/components/layouts/UserPanelLayout";
import React from "react";
import connectToDB from "@/configs/db";
import commentModel from "@/models/Comment";
import { userAuth } from "@/utils/userAuth";

const page = async () => {
  connectToDB();
  const user = await userAuth();
  const comments = await commentModel.find(
    { user: String(user._id) },
    "-__v"
  ).populate("productID", "name");

  console.log(comments);

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
