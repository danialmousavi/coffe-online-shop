import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb"
import Footer from "@/components/modules/footer/Footer"
import Navbar from "@/components/modules/navbar/Navbar"
import Comment from "@/components/templates/article/comment/Comment";
import Details from "@/components/templates/article/details/Details";
import connectToDB from "@/configs/db";
import articleModel from "@/models/Article";
import styles from '@/styles/article.module.css'
import { userAuth } from "@/utils/userAuth";


const page =async ({params}) => {
    const user=await userAuth()
    const{id}=params
    connectToDB();
    const article=await articleModel.findOne({_id:id}).populate("creator").lean();
    console.log("article",article);
    
    return (
        <>
            <Navbar user={JSON.parse(JSON.stringify(user))}/>
            <Breadcrumb route={'قهوه'} />
            <div className={styles.container}>
                <Details {...article} />
                {/* <Comment /> */}
            </div>

            <Footer />
        </>
    )
}

export default page
