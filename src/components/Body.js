import { useState, useEffect } from "react";
import { RestaurantList, RESTAURANTS_LISTINGS_URL } from "../config";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { filterData } from "../utils/helper"; 
import useOnline from "../utils/useOnline";


const Body = () => {

  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);

  useEffect(()=>{getRestaurants()},[])

// DO ERROR HANDLING HERE WHILE FETCHING DATA
    async function getRestaurants () {
    const data = await fetch(RESTAURANTS_LISTINGS_URL);
    const json = await data.json();
    setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
  }


const offline = useOnline();

  if (!offline) {
    return (<h1>Sorry, you seem to be offline! Please try again!</h1>)
  }

  if (!allRestaurants) return null;


  return (allRestaurants.length===0)?<Shimmer />:(
    <>
    <div className="search-container">
      <input 
      type="text" 
      className="search-input" 
      placeholder="Search" 
      value = {searchText}
      onChange={(e) => {
        setSearchText(e.target.value);
        }} />
      <button 
      className="search-btn"
      onClick= {()=>{
        const data = filterData(searchText, allRestaurants);
        setFilteredRestaurants(data);
      }}
      >Search</button>
    </div>
    <div className="restaurant-list">
       
      {
      filteredRestaurants.length===0?<h1>No restaurants found. Please try again</h1>:
      filteredRestaurants.map(restaurant => {
      return <Link to={"/restaurant/"+restaurant.data.id} key={restaurant.data.id}><RestaurantCard {...restaurant.data} /></Link>
      })}
    </div>
    </>
  )
}

export default Body;