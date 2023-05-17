import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
import useOnline from "../utils/useOnline";

const Title = () => {
  return (
    <Link to="/">
      <img data-testid="logo" className="h-28 p-2" alt="app-logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Y4M74UH-DIE2aUFwmbjTLe84IGdLbSPeac3LK7JmTkHcaGWJ9LasRX7MPnB3ntqH2IU" />
    </Link>
  )
}


const Header = () => {

  const isOnline = useOnline();



  const { user } = useContext(UserContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const cartItems = useSelector(store => store.cart.items);

  return (
    
    <div className="flex justify-between bg-pink-50 shadow-lg sm:bg-blue-50 md:bg-yellow-50">
      <Title />  
      <div className="nav-items">
        < ul className="flex py-10">
          <li className="px-2"><Link to="/">Home</Link></li>
          <li className="px-2"><Link to="/about">About Us</Link></li>
          <li className="px-2"><Link to="/contact">Contact Us</Link></li>
          <li className="px-2"><Link to="/instamart">Instamart</Link></li>
          <li className="px-2"><Link to="/cart">Cart - {cartItems.length} items</Link></li>
        </ul>
      </div>
      <div className="m-10">{isOnline?"✅":"🛑"}</div>
      <h1 className="p-10 font-bold text-red-900">{user.name}</h1>
      {isLoggedIn?
      (<button onClick={()=>{setIsLoggedIn(false)}}>{user.name}Logout</button>):
      (<button onClick={()=>{setIsLoggedIn(true)}}>Login</button>)
      }
    </div>
  );
};

export default Header;