import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import connectToDB from "@/configs/db";
import WishlistModle from "@/models/Wishlist";
import { userAuth } from "@/utils/userAuth";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import styles from "@/styles/wishlist.module.css";
import Product from "@/components/modules/product/Product";
const page = async () => {
  let wishes = [];
  connectToDB();
  const user = await userAuth();
  if (user) {
    wishes = await WishlistModle.find({ user: user._id })
      .populate("product", "name price score")
      .lean();
  }

  return (
    <>
      <Navbar user={JSON.parse(JSON.stringify(user))}/>
      <Breadcrumb route={"علاقه مندی ها"} />
      <main className={styles.container} data-aos="fade-up">
        <p className={styles.title}>محصولات مورد علاقه شما</p>
        <section>
          {wishes.length > 0 &&
            wishes.map((wish) => <Product key={wish._id} {...wish.product} />)}
        </section>
      </main>

      {wishes.length === 0 && (
        <div className={styles.wishlist_empty} data-aos="fade-up">
          <FaRegHeart />
          <p>محصولی یافت نشد</p>
          <span>شما هنوز هیچ محصولی در لیست علاقه مندی های خود ندارید.</span>
          <span>در صفحه "فروشگاه" محصولات جالب زیادی پیدا خواهید کرد.</span>
          <div>
            <Link href="/category">بازگشت به فروشگاه</Link>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default page;
