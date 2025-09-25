import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Form from "@/components/templates/contact-us/Form";
import Information from "@/components/templates/contact-us/Information";
import styles from "@/styles/contact-us.module.css";
import { userAuth } from "@/utils/userAuth";

const page = async () => {
  const user = await userAuth();

  return (
    <>
      <Navbar user={user} />
      <Breadcrumb route={"تماس با ما"} />
      <div className={styles.container}>
        <div className={styles.contents}>
          <Form />
          <Information />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default page;
