import Navbar from "@/components/modules/navbar/Navbar";
import Banner from "@/components/templates/index/banner/Banner";
import Latest from "@/components/templates/index/latest/Latest";
import Promote from "@/components/templates/index/promote/Promote";

export default function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <Latest/>
      <Promote/>
    </>
  );
}
