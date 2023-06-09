import React, { lazy, Suspense }  from "react";
import ReactDOM from "react-dom/client";
import Header from "./Header.js";
import About from "./About.js";
import Body from "./Body.js";
import Contact from "./Contact.js";
import Error from "./Error.js";
import Footer from "./Footer.js";
import RestaurantCard from "./RestaurantCard.js";
import { IMG_CDN_URL } from "../config.js";
import { createHashRouter, RouterProvider, Outlet } from "react-router-dom";
import RestaurantMenu from "./RestaurantMenu.js";
import Profile from "./Profile.js";
import ProfileClass from "./ProfileClass.js";
import { Provider } from "react-redux";
import store from "../utils/store.js";
import Cart from "./Cart.js";

const Instamart = lazy(()=>import("./Instamart.js"))

const AppLayout = () => {
  return (
    <Provider store={store}>
      <Header />
      <Outlet />
      <Footer />
    </Provider>
  )
}


const appRouter = createHashRouter([
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
        element: <About />,
        children: [
          {
            path: "profile",
            element: <ProfileClass name="Chris" />
          }
        ]
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/instamart",
        element: <Suspense fallback={<h1>Page is loading...</h1>}><Instamart /></Suspense>
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />
      }

    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);