import RestaurantList from '../../data/restaurantdb-source';
import { RestaurantItemTemplate } from '../templates/template-creator';

const home = {
  async render() {
    return `
    <section class="hero">
    <div class="kata">
      <h1>Bingung Mencari Resto Ketika Sedang Berpergian?</h1>
      <p>
      Cari Resto Terbaikmu Dari Beberapa Wilayah Di Indonesia Disini!
      </p>
    </div>
  </section>
  <div class="content">
    <h2 class="content__heading">Daftar Restaurant</h2>
    <div id="restaurants" class="restaurants">
    </div>
  </div>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantList.fetchRestaurantList();
    console.log('Fetched restaurants:', restaurants);

    const restaurantsContainer = document.getElementById('restaurants');
    if (restaurants && restaurants.length > 0) {
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML += RestaurantItemTemplate(restaurant);
      });
    } else {
      restaurantsContainer.innerHTML = '<p>No restaurants found</p>';
    }
  },
};

export default home;
