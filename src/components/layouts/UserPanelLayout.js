import React from "react";
import styles from "./userPanelLayout.module.css";
import Sidebar from "@/components/modules/p-user/Sidebar";
import Topbar from "@/components/modules/p-user/Topbar";
import { userAuth } from "@/utils/userAuth";
import { redirect } from "next/navigation";

const Layout = async ({ children }) => {
  const user = await userAuth();
  console.log("user dataaaaaaaaaaaaaaa",user);
  
  if(!user){
    redirect("/login-register")
  }
  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        <Sidebar user={JSON.parse(JSON.stringify(user))}/>
        <div className={styles.contents}>
          <Topbar user={JSON.parse(JSON.stringify(user))}/>
          {children}
        </div>
      </section>
    </div>
  );
};

export default Layout;
