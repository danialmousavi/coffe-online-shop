import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Pagination from "@/components/modules/pagination/Pagination";
import Card from "@/components/templates/articles/card/Card";
import connectToDB from "@/configs/db";
import articleModel from "@/models/Article";
import styles from "@/styles/articles.module.css";
import { userAuth } from "@/utils/userAuth";

const page = async () => {
  const user = await userAuth();
  connectToDB();
  const articles = await articleModel.find({}).populate("creator").lean();

  return (
    <>
      <Navbar user={JSON.parse(JSON.stringify(user))} />

      <Breadcrumb route={"اخبار و مقالات"} />
      <main className={styles.container}>
        <div className={styles.articles}>
          {articles.map((article) => (
            <Card {...article} />
          ))}

        </div>
        {/* <Pagination /> */}
      </main>

      <Footer />
    </>
  );
};

export default page;
