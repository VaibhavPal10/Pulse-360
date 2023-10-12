import React from "react";
import NavBar from "../components/NavBar";
import Intro from "../components/Intro";
import Footer from "../components/Footer";
import logo from "../assets/weblogo-removebg-preview.png";
export default function home(){
    localStorage.clear();
    return(
        <>
            <NavBar/>
            <img src={logo} alt='logo' className="logo"></img>
            <Intro/>
            <div className="footerContainer">
            <Footer/>
            </div>
        </>
    );
}