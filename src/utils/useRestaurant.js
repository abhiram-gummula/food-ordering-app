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

    const itemsItemCategory = Array.from((json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(card=>((card?.card?.card["@type"]==="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")&&(card?.card?.card?.title !== "Recommended"))).map((card)=>{return card?.card?.card?.itemCards}).map((array)=>{return array.map((arrayElement)=>{return arrayElement.card.info})}).flatMap(arr=>arr)).reduce((map,obj)=>map.set(obj.id,obj), new Map()).values());


    const itemsNestedItemCategory = Array.from((json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(card=>((card?.card?.card["@type"]==="type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"))))).map((arr)=>{return arr.card.card.categories}).flatMap((arr)=>arr).map((arr)=>{return arr.itemCards}).flatMap((arr)=>arr).map((arr)=>{return arr?.card?.info});

    const items = [...itemsItemCategory, ...itemsNestedItemCategory];
    setMenu(items);
}
return {restaurant, menu};
}

export default useRestaurant;