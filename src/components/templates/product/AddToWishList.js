"use client"
import React from "react";
import { CiHeart } from "react-icons/ci";

async function AddToWishList() {
    const addWishList=async()=>{
        console.log("add to wish list event handler");
        
    }
  return (
    <div onClick={addWishList}>
      <CiHeart />
      <a href="/">افزودن به علاقه مندی ها</a>
    </div>
  );
}

export default AddToWishList;
