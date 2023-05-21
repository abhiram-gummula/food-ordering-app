import { render } from "@testing-library/react";
import Header from "../Header";
import { Provider } from "react-redux";
import store from "../../utils/store"
import {StaticRouter} from "react-router-dom/server"



test("Logo should load on rendering header",()=>{
  //Load Header
  
  const header = render(<StaticRouter><Provider store={store}><Header /></Provider></StaticRouter>);


  // Check if logo is loaded
  const logo = header.getAllByTestId("logo");
  expect(logo[0].src).toBe('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Y4M74UH-DIE2aUFwmbjTLe84IGdLbSPeac3LK7JmTkHcaGWJ9LasRX7MPnB3ntqH2IU')
  
})

test("Online status should be green on rendering header",()=>{
  //Load Header
  
  const header = render(<StaticRouter><Provider store={store}><Header /></Provider></StaticRouter>);


  // Check if online Status is green
  const onlineStatus = header.getByTestId("online-status");
  expect(onlineStatus.innerHTML).toBe('✅');
  
})

test("Cart should have 0 items on rendering header",()=>{
  //Load Header
  
  const header = render(<StaticRouter><Provider store={store}><Header /></Provider></StaticRouter>);


  // Check if cart is empty
  const cart = header.getByTestId("cart");
  expect(cart.innerHTML).toBe('Cart - 0 items');
  
})


