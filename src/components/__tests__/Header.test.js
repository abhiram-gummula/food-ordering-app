import { render } from "@testing-library/react";
import Header from "../Header";
import { Provider } from "react-redux";
import store from "../../utils/store"
import {StaticRouter} from "react-router-dom/server"

test("Logo should load on rendering header",()=>{
  //Load Header
  const header = render(<StaticRouter><Provider store={store}><Header /></Provider></StaticRouter>);
  // console.log(header);
  const logo = header.getAllByTestId("logo");
  // console.log(logo)
  // Check if logo is loaded
  expect(logo[0].src).toBe('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Y4M74UH-DIE2aUFwmbjTLe84IGdLbSPeac3LK7JmTkHcaGWJ9LasRX7MPnB3ntqH2IU')
  
})