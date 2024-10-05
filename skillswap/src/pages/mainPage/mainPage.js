import React, { useState } from "react";
import NavBar from "../../components/navBar/navBar";
import "./mainPage.css";
import arrow from "../../assets/img/welcomePage/arrows2.png";
import SignInOverlay from "../../components/signIn/signIn";
import SignUp from "../../components/signUp/signUp";
import SideBar from "../../components/sideBar/SideBar";
import Chat from "../message/message";
import Community from "../community/community";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="mainPage">
      <div className="mainPageSideBar">
        <SideBar></SideBar>
      </div>

      <div className="mainComponents">
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
