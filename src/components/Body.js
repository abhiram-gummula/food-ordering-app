import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { filterData } from "../utils/helper";
import useOnline from "../utils/useOnline";
import useLocation from "../utils/useLocation";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);

  const location = useLocation();
  const lat = location ? location[0] : null;
  const long = location ? location[1] : null;

  useEffect(() => {
    if (location) {
      getRestaurants();
    }
  }, [location]);

  async function getRestaurants() {
    try {
      const RESTAURANTS_LISTINGS_URL = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${long}&page_type=DESKTOP_WEB_LISTING`;
      const data = await fetch(RESTAURANTS_LISTINGS_URL);
      const json = await data.json();
      setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
      setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  }

  const isOnline = useOnline();

  if (!isOnline) {
    return <h1>Sorry, you seem to be offline! Please try again!</h1>;
  }

  if (!allRestaurants) return null;

  return allRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="search-container p-5 bg-pink-50 my-5">
        <input
          type="text"
          className="focus:bg-green-500"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          data-testid="search-btn"
          className="p-2 m-2 bg-purple-900 hover:bg-gray-500 text-white rounded-md"
          onClick={() => {
            const data = filterData(searchText, allRestaurants);
            setFilteredRestaurants(data);
          }}
        >
          Search
        </button>
      </div>
      <div className="flex flex-wrap" data-testid="res-list">
        {filteredRestaurants.length === 0 ? (
          <h1>No restaurants found. Please try again</h1>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <Link to={"/restaurant/" + restaurant.data.id} key={restaurant.data.id}>
              <RestaurantCard {...restaurant.data} />
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export default Body;
