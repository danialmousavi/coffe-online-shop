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

const product = async ({params}) => {
  const user = await userAuth();
  const productID=params.id;
  connectToDB()
  const product=await productModel.findOne({_id:productID}).populate("comments");
  
  const relatedProducts = await productModel.find({
    _id: { $ne: product._id }, // خود محصول رو نیاره
    tags: { $in: product.tags }, // هر محصولی که حداقل یکی از تگ‌های این محصول رو داشته باشه
  });
  
  return (
    <div className={styles.container}>
      <Navbar user={JSON.parse(JSON.stringify(user))}/>
      <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Details product={JSON.parse(JSON.stringify(product))} />
          <Gallery />
        </div>
        <Tabs  product={JSON.parse(JSON.stringify(product))} />
        <MoreProducts relatedProducts={JSON.parse(JSON.stringify(relatedProducts))}/>
      </div>
      <Footer />
    </div>
  );
};

export default product;
