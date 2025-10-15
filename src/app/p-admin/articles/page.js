import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/articles/table.module.css";
import Table from "@/components/templates/p-admin/articles/Table";
import connectToDB from "@/configs/db";
import articleModel from "@/models/Article";
import AddArticle from "@/components/templates/p-admin/articles/AddArticle";

const page = async () => {
  connectToDB();
  const articles = await articleModel.find({}).sort({ _id: -1 }).lean();
    console.log("articlesssssssss",articles);
    
  return (
    <Layout>
      <main>
        <AddArticle />

        {articles.length === 0 ? (
          <p className={styles.empty}>مقاله ای وجود ندارد</p>
        ) : (
          <Table
            articles={JSON.parse(JSON.stringify(articles))}
            title="لیست محصولات"
          />
        )}
      </main>
    </Layout>
  );
};

export default page;
