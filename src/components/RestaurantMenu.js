import {useParams} from "react-router-dom"
import { IMG_CDN_URL } from "../config";
import Shimmer from "./Shimmer";
import useRestaurant from "../utils/useRestaurant";

const RestaurantMenu = () => {

  const {resId} = useParams();
  const {restaurant, menu} = useRestaurant(resId);

  
  return !restaurant || !menu ? <Shimmer /> : (
    <div className="restaurant-details">
      <div>
        <h1>Restaurant ID: {resId}</h1>
        <h2>Name - {restaurant.name}</h2>
        <img className="restaurant-image" alt ="restaurant-image" src={IMG_CDN_URL+restaurant?.cloudinaryImageId}/>
        <h2>City - {restaurant.city}</h2>
        <h2>Locality - {restaurant.locality}</h2>
        <h2>Cuisines - {restaurant.cuisines.join(", ")}</h2>
        <h2>Rating - {restaurant.avgRating}</h2>
        <h2>Cost for two - {restaurant.costForTwoMessage}</h2>
      </div>
      <div>
        <h1>Menu - Recommended Items</h1>
        <ul>
          {menu.map((item)=>{return <li key={item.id}>{item?.name}</li>})}
        </ul>
        
      </div>
    </div>
  );

}

export default RestaurantMenu;

// menu.map((array) =>array.map((obj) => <li key={obj?.card?.info?.id}>{obj?.card?.info?.name