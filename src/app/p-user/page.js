import Layout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/index.module.css";
import Box from "@/components/modules/infoBox/InfoBox";
import Tickets from "@/components/templates/p-user/index/Tickets";
import Orders from "@/components/templates/p-user/index/Orders";
import connectToDB from "@/configs/db";
import { userAuth } from "@/utils/userAuth";
import ticketModel from "@/models/Ticket";
import commentModel from "@/models/Comment";
import WishlistModle from "@/models/Wishlist";
const page = async() => {
  connectToDB();
  const userInfo=await userAuth();
  const userTickets=await ticketModel.find({user:userInfo._id}).limit(3).populate("department","title").sort({_id:-1}).lean()
  console.log(userTickets);
  const tickets=await ticketModel.find({user:userInfo._id})
  const comments=await commentModel.find({user:String(userInfo._id)})
  const wishlist=await WishlistModle.find({user:userInfo._id})

  return (
    <Layout>
      <main>
        <section className={styles.boxes}>
          <Box title="مجموع تیکت ها " value={tickets.length} />
          <Box title="مجموع کامنت ها " value={comments.length} />
          <Box title="مجموع سفارشات" value="2" />
          <Box title="مجموع علاقه مندی ها" value={wishlist.length}/>
        </section>
        <section className={styles.contents}>
          <Tickets tickets={JSON.parse(JSON.stringify(userTickets))}/>
          <Orders />
        </section>
      </main>
    </Layout>
  );
};

export default page;
