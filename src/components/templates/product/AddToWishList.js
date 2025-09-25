"use client";
import { showSwal } from "@/utils/Helpers";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";

function AddToWishList({productID}) {
  const [user, setUser] = useState({});
  useEffect(() => {
    const authUser = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      console.log(data);
      setUser(data);
    };
    authUser();
  }, []);
  const addWishList = async (e) => {
    e.preventDefault();
    if(!user?._id){
      return showSwal("برای اضافه کردن به علاقه مندی ها لاگین کنید","error","فهمیدم")
    }
    const wishList={
      product:productID,
      user:user._id
    }
    const res=await fetch("/api/wishlist",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(wishList)
    })
    if(res.status==201){
      showSwal("محصول با موفقیت به لیست علاقه مندی شما اضافه شد","success","تایید")
    }else if(res.status==409){
      showSwal("این محصول قبلا به لیست علاقه مندی ها اضافه شده است","warning","تایید")
    }
    
  };
  return (
    <div onClick={addWishList}>
      <CiHeart />
      <a href="/">افزودن به علاقه مندی ها</a>
    </div>
  );
}

export default AddToWishList;
