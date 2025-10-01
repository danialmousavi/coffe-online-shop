import React from "react";
import AdminPanelLayout from "@/components/layouts/AdminPanelLayout";

import styles from "@/styles/p-admin/index.module.css";
import Box from "@/components/modules/infoBox/InfoBox";

import connectToDB from "@/configs/db";
import ticketModel from "@/models/Ticket";
import userModel from "@/models/User";
import productModel from "@/models/Product";

async function AdminHomePage() {
  connectToDB();
  const tickets = await ticketModel.find({}).lean();
  const users = await userModel.find({}).lean();
  const products = await productModel.find({}).lean();

  return (
    <AdminPanelLayout>
      <main>
        <section className={styles.dashboard_contents}>
          <Box title="مجموع تیکت های دریافتی" value={tickets.length} />
          <Box title="مجموع محصولات سایت" value={products.length} />
          <Box title="مجموع سفارشات" value="333" />
          <Box title="مجموع کاربر های سایت" value={users.length} />
        </section>{" "}
        <div className={styles.dashboard_charts}>
          <section>
            <p>آمار فروش</p>
          </section>
          <section>
            <p>نرخ رشد</p>
          </section>
        </div>
      </main>
    </AdminPanelLayout>
  );
}

export default AdminHomePage;
