import { useState } from "react";

const Title = () => {
  return (
    <a href="/">
      <img className="app-logo" alt="app-logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Y4M74UH-DIE2aUFwmbjTLe84IGdLbSPeac3LK7JmTkHcaGWJ9LasRX7MPnB3ntqH2IU" />
    </a>
  )
}


const Header = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    
    <div className="header">
      <Title />  
      <div className="nav-items">
        < ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
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