import React from "react";
import Navbar from "../components/Navbar";
import CardGrid from "../components/cardgrid";
import Cat1 from "../pages/categorypagebefore";
import Wish from "../pages/wishlist";
import NavBar from "../components/Navbar";
import Footer from "../components/footer";
import AppStore from "../assets/AppStore.svg";
import GooglePlay from "../assets/GooglePlay.svg";
import SecondPhone from "../assets/SecondPhone.svg";
import DownloadPromo from "../components/DownloadPromo";

function CategoryPage() {
  return (
    <>
      <NavBar />
      <div className="mb-[60px]">
        <Wish />
        <div className="bg-black mx-auto w-[85%] sm:w-[94%] h-[1px] ml-[6] mt-3"></div>
      </div>
      <CardGrid />
      

      {/* Eighth Division  */}
      <DownloadPromo />

      <Footer />
    </>
  );
}

export default CategoryPage;
