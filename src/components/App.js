import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Header.js";
import About from "./About.js";
import Body from "./Body.js";
import Contact from "./Contact.js";
import Error from "./Error.js";
import Footer from "./Footer.js";
import RestaurantCard from "./RestaurantCard.js";
import { IMG_CDN_URL } from "../config.js";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import RestaurantMenu from "./RestaurantMenu.js";


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
    <Header />
    <Outlet />
    <Footer />
    </>
  )
}


const appRouter = createBrowserRouter([
  {
    path: "/", 
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantMenu />
      }

    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);