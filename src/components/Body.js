import { useState } from "react";
import { RestaurantList } from "../config";
import RestaurantCard from "./RestaurantCard";

function filterData (searchText, restaurants) {
  return restaurants.filter((restaurant)=>restaurant.data.name.includes(searchText))
}

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [restaurants, setRestaurants] = useState(RestaurantList);
  return (
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
        const data = filterData(searchText, restaurants);
        setRestaurants(data);
      }}
      >Search</button>
    </div>
    <div className="restaurant-list">
      {restaurants.map(restaurant => {
        return <RestaurantCard {...restaurant.data} key={restaurant.data.id} />
      })}
    </div>
    </>
  )
}

export default Body;