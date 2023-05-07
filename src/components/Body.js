import { useState, useEffect } from "react";
import { RestaurantList } from "../config";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";

function filterData (searchText, restaurants) {
  return restaurants.filter((restaurant)=>restaurant?.data?.name?.toLowerCase().includes(searchText.toLowerCase()))
}


const Body = () => {

  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);

  useEffect(()=>{getRestaurants()},[]);

  async function getRestaurants () {
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.504829&lng=78.470697&page_type=DESKTOP_WEB_LISTING");
    const json = await data.json();
    console.log(json);
    setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
  }

  console.log("rendered")

  if (!allRestaurants) return null;

  if  (filteredRestaurants.length===0) return <h1>No restaurants match your search!!!</h1>


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
      {/* Write logic here for no restaurant found */}
      {filteredRestaurants.map(restaurant => {
        return <RestaurantCard {...restaurant.data} key={restaurant.data.id} />
      })}
    </div>
    </>
  )
}

export default Body;