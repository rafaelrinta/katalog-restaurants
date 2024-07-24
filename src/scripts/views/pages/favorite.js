import RestaurantList from '../../data/restaurantdb-source';
import { RestaurantItemTemplate } from '../templates/template-creator';

const favorite = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Favorite Restaurants</h2>
        <div id="restaurants" class="restaurants"></div>
      </div>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantList.fetchFavoriteRestaurantList();
    const restaurantsContainer = document.getElementById('restaurants');

    if (restaurants.length === 0) {
      // eslint-disable-next-line operator-linebreak
      restaurantsContainer.innerHTML =
        '<p>No favorite restaurants to display</p>';
    } else {
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML += RestaurantItemTemplate(restaurant);
      });
    }
  },
};

export default favorite;
