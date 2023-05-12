import { useState } from "react";
import { Link } from "react-router-dom";

const Title = () => {
  return (
    <Link to="/">
      <img className="h-28 p-2" alt="app-logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Y4M74UH-DIE2aUFwmbjTLe84IGdLbSPeac3LK7JmTkHcaGWJ9LasRX7MPnB3ntqH2IU" />
    </Link>
  )
}


const Header = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    
    <div className="flex justify-between bg-pink-50 shadow-lg sm:bg-blue-50 md:bg-yellow-50">
      <Title />  
      <div className="nav-items">
        < ul className="flex py-10">
          <li className="px-2"><Link to="/">Home</Link></li>
          <li className="px-2"><Link to="/about">About Us</Link></li>
          <li className="px-2"><Link to="/contact">Contact Us</Link></li>
          <li className="px-2"><Link to="/instamart">Instamart</Link></li>
          <li className="px-2">Cart</li>
        </ul>
      </div>
      {isLoggedIn?
      (<button onClick={()=>{setIsLoggedIn(false)}}>Logout</button>):
      (<button onClick={()=>{setIsLoggedIn(true)}}>Login</button>)
      }
    </div>
  );
};

export default Header;