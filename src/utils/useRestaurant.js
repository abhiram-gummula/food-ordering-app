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

    const items = json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(card=>card.card.card.title==="Recommended")[0]?.card?.card?.itemCards.map((itemCard)=>{return itemCard?.card?.info})

    console.log(items);

    // const items = (json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards).map((itemCard)=>{return itemCard?.card?.info})

    setMenu(items);
}
return {restaurant, menu};
}

export default useRestaurant;