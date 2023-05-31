import { useState, useEffect } from "react";
import useLocation from "./useLocation";

const useRestaurant = (resId) => {
  const location = useLocation();
  const lat = location ? location[0] : null;
  const long = location ? location[1] : null;

  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    if (location) {
      getRestaurantInfo();
    }
  }, [location]);

  async function getRestaurantInfo() {
    try {
      const FETCH_MENU_URL = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${long}&restaurantId=${resId}`;
      const data = await fetch(FETCH_MENU_URL);
      const json = await data.json();
      setRestaurant(json?.data?.cards[0]?.card?.card?.info);

      const itemsItemCategory = Array.from(
        json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards
          .filter(
            (card) =>
              card?.card?.card["@type"] ===
                "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" &&
              card?.card?.card?.title !== "Recommended"
          )
          .map((card) => card?.card?.card?.itemCards)
          .map((array) => array.map((arrayElement) => arrayElement.card.info))
          .flatMap((arr) => arr)
      );

      const itemsNestedItemCategory = Array.from(
        json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
          (card) =>
            card?.card?.card["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
        )
      )
        .map((arr) => arr.card.card.categories)
        .flatMap((arr) => arr)
        .map((arr) => arr.itemCards)
        .flatMap((arr) => arr)
        .map((arr) => arr?.card?.info);

      const items = [...itemsItemCategory, ...itemsNestedItemCategory];
      setMenu(items);
    } catch (error) {
      console.error("Error fetching restaurant info:", error);
    }
  }

  return { restaurant, menu };
};

export default useRestaurant;
