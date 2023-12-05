import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer/Footer";
import { useMediaQuery, useTheme } from "@mui/material";
import { NavBar } from "../components/Navbar/Navbar";
import { Sidebar } from "../components/Sidebar/Sidebar";

export const HeroEditor = () => {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down("sm"));

  return (
    <>
      {isMobile ? <NavBar /> : <Sidebar />}
      <Outlet />
      <Footer />
    </>
  );
};
