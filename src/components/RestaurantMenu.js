import { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import { IMG_CDN_URL } from "../config";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
  const {id} = useParams();
  const [restaurant,setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);

  useEffect(()=>{getRestaurantInfo()},[])

  async function getRestaurantInfo() {
    data = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.504829&lng=78.470697&restaurantId="+id+"&submitAction=ENTER");
    json = await data.json();
    setRestaurant(json?.data?.cards[0]?.card?.card?.info);

    // Assuming the data is stored in a variable called 'json'
    const allCards = json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

    // Find the cards
    const itemCategoryCards = allCards.filter(card => card.card.card["@type"]==="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory").map(card=>card.card.card.itemCards);
    const nestedItemCategoryCards = allCards.filter(card => card.card.card["@type"]==="type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory");
  
    setMenu(itemCategoryCards);
  
    // console.log(nestedItemCategoryCards)

    // Extract the menu items
    // const menuItems = menuCard.groupedCard.cardGroupMap.REGULAR.cards
    // .filter(card => card.card.card["@type"] === 'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory').map(card => card?.card?.card?.itemCards[2]?.card?.info?.name);

    // // Log the names of all the menu items
    // console.log(menuItems);
  }

  return !restaurant? <Shimmer />:(
    <div className="restaurant-details">
      <div>
        <h1>Restaurant ID: {id}</h1>
        <h2>Name - {restaurant.name}</h2>
        <img className="restaurant-image" alt ="restaurant-image" src={IMG_CDN_URL+restaurant?.cloudinaryImageId}/>
        <h2>City - {restaurant.city}</h2>
        <h2>Locality - {restaurant.locality}</h2>
        <h2>Cuisines - {restaurant.cuisines.join(", ")}</h2>
        <h2>Rating - {restaurant.avgRating}</h2>
        <h2>Cost for two - {restaurant.costForTwoMessage}</h2>
      </div>
      <div>
        <h1>Menu - Item Category Cards</h1>
        <ul>
          <h2>{menu.map((array) =>array.map((obj) => <li>{obj.card.info.name}</li>))}</h2>
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;