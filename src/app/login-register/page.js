"use client"
import React, { useState } from 'react'
import styles from "@/styles/login-register.module.css"
import Login from '@/components/templates/login-register/Login';
import Register from '@/components/templates/login-register/Register';
export default function page() {
  const [authType,setAuthType]=useState("login");
  const showRegisterForm=()=>{
    setAuthType("register");
  }
  const showloginForm=()=>{
    setAuthType("login");
  }
  return (
    <div className={styles.login_register}>
      <div className={styles.form_bg} data-aos="fade-up">
        {authType =="login" ? (
          <Login showRegisterForm={showRegisterForm} />
        ) : (
          <Register showloginForm={showloginForm} />
        )}
      </div>
      <section>
        <img
          src="https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg"
          alt=""
        />
      </section>
    </div>
  )
}
