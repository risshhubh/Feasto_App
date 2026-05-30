import { restaurantData } from './restaurantData';

export const menuData = {};

restaurantData.forEach((restaurant) => {
  const slug = restaurant.name.toLowerCase().replace(/\s+/g, '-');
  // Re-map fields to support original properties if needed
  menuData[slug] = restaurant.menu.map((dish) => ({
    id: dish.id,
    name: dish.name,
    description: dish.description,
    image: dish.image,
    price: dish.price,
    rating: dish.rating,
    reviews: dish.reviews
  }));
});