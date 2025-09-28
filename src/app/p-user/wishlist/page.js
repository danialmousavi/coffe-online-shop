import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/wishlist.module.css";
import connectToDB from "@/configs/db";
import { userAuth } from "@/utils/userAuth";
import WishlistModle from "@/models/Wishlist";
import ProductCard from "@/components/templates/p-user/wishlist/Product";

const page = async () => {
  connectToDB();
  const user = await userAuth();
  const wishlist = await WishlistModle.find({ user: user._id }).populate(
    "product"
  );
  console.log("wishlist", wishlist);

  return (
    <UserPanelLayout>
      <main>
        <h1 className={styles.title}>
          <span>علاقه مندی ها</span>
        </h1>
        <div className={styles.container}>
          {wishlist.length &&
            wishlist.map((wish) => (
              <ProductCard
                key={wish._id}
                name={wish.product?.name}
                price={wish.product?.price}
                score={wish.product?.score}
              />
            ))}
        </div>

        {wishlist.length === 0 && (
          <p className={styles.empty}>محصولی وجود ندارد</p>
        )}
      </main>
    </UserPanelLayout>
  );
};

export default page;
