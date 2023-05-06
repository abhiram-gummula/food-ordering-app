import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Header.js";
import Body from "./Body.js";
import Footer from "./Footer.js";
import RestaurantCard from "./RestaurantCard.js";
import { IMG_CDN_URL } from "../config.js";

/* App Layout - 
Header
  Logo
  Nav Items
    Home
    About Us
    Contact Us
  Cart
Body
  Searchbar
  RestaurantList
    RestaurantCard
      Image
      Name
      Cuisines
      Distance
Footer
  Links
  Copyright
*/




const AppLayout = () => {
  return (
    <>
    {/* <Title /> */}
    <Header />
    <Body />
    <Footer />
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);