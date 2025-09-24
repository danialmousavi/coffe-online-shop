import styles from "@/styles/product.module.css";

import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import { userAuth } from "@/utils/userAuth";
import Gallery from "@/components/templates/product/Gallery";
import Details from "@/components/templates/product/Details";
import Tabs from "@/components/templates/product/Tabs";
import MoreProducts from "@/components/templates/product/MoreProducts";
import connectToDB from "@/configs/db";
import productModel from "@/models/Product";
import { Jost } from "next/font/google";

const product = async ({params}) => {
  const user = await userAuth();
  const productID=params.id;
  connectToDB()
  const product=await productModel.findOne({_id:productID}).populate("comments");
  
  
  return (
    <div className={styles.container}>
      <Navbar isLogin={user ? true : false} />
      <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Details product={JSON.parse(JSON.stringify(product))} />
          <Gallery />
        </div>
        <Tabs  product={JSON.parse(JSON.stringify(product))} />
        <MoreProducts />
      </div>
      <Footer />
    </div>
  );
};

export default product;
