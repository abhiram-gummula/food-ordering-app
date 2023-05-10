import {useState, useEffect} from "react"
import { FETCH_MENU_URL } from "../config";

const useRestaurant = (resId) => {


  const [restaurant,setRestaurant] = useState(null);
  const [menu, setMenu] = useState(null);

  useEffect(()=>{getRestaurantInfo()},[])

  async function getRestaurantInfo() {
    const data = await fetch(FETCH_MENU_URL+resId);
    const json = await data.json();
    setRestaurant(json?.data?.cards[0]?.card?.card?.info);

    // Assuming the data is stored in a variable called 'json'
    const itemCategoryCards = json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(card => card?.card?.card["@type"]==="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory").map(card=>card?.card?.card?.itemCards);

    setMenu(itemCategoryCards);
}
return {restaurant, menu};
}

export default useRestaurant;