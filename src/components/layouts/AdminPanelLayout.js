import React from "react";
import styles from "./adminPanelLayout.module.css";
import Sidebar from "@/components/modules/p-admin/Sidebar";
import Topbar from "@/components/modules/p-admin/Topbar";
import { userAuth } from "@/utils/userAuth";
import { redirect } from "next/navigation";

const Layout = async({ children }) => {
  const user =await userAuth();
  if(!user){
   return redirect("/login-register")
  }
  if(user.role!="ADMIN"){
   return redirect("/")
  }
  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        <Sidebar user={JSON.parse(JSON.stringify(user))} />
        <div className={styles.contents}>
          <Topbar user={JSON.parse(JSON.stringify(user))}/>
          {children}
        </div>
      </section>
    </div>
  );
};

export default Layout;
