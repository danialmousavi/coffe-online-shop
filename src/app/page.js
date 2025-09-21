import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Articles from "@/components/templates/index/articles/Articles";
import Banner from "@/components/templates/index/banner/Banner";
import Latest from "@/components/templates/index/latest/Latest";
import Promote from "@/components/templates/index/promote/Promote";
import { verifyAccessToken } from "@/utils/auth";
import { cookies } from "next/headers";

export default function Home() {
  const token = cookies().get("token")?.value;
  let user = null;

  if (token) {
    const tokenPayload = verifyAccessToken(token);
    console.log(tokenPayload); // باید payload درست رو نشون بده
    user = tokenPayload;
  }

  return (
    <>
      <Navbar user={user}/>
      <Banner />
      <Latest/>
      <Promote/>
      <Articles/>
      <Footer/>
    </>
  );
}
