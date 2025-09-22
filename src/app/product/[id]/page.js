import styles from "@/styles/product.module.css";

import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import { userAuth } from "@/utils/userAuth";
import Gallery from "@/components/templates/product/Gallery";
import Details from "@/components/templates/product/Details";
import Tabs from "@/components/templates/product/Tabs";
import MoreProducts from "@/components/templates/product/MoreProducts";

const product = async () => {
  const user = await userAuth();

  return (
    <div className={styles.container}>
      <Navbar isLogin={user ? true : false} />
      <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Details />
          <Gallery />
        </div>
        <Tabs />
        <MoreProducts />
      </div>
      <Footer />
    </div>
  );
};

export default product;
