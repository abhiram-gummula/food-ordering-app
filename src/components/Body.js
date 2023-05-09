import { useState, useEffect } from "react";
import { RestaurantList } from "../config";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

function filterData (searchText, restaurants) {
  return restaurants.filter((restaurant)=>restaurant?.data?.name?.toLowerCase().includes(searchText.toLowerCase()))
}


const Body = () => {

  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);

  useEffect(()=>{getRestaurants()},[]);

// DO ERROR HANDLING HERE WHILE FETCHING DATA
  async function getRestaurants () {
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.504829&lng=78.470697&page_type=DESKTOP_WEB_LISTING");
    const json = await data.json();
    console.log(json);
    setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
  }

  console.log("rendered")

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