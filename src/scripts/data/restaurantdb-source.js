import API_ENDPOINT from '../globals/api-endpoint';
import FavoriteIdb from './favoritedb-source';

function showLoading() {
  document.getElementById('loading').classList.remove('hidden');
}

function hideLoading() {
  document.getElementById('loading').classList.add('hidden');
}

class RestaurantList {
  static async fetchRestaurantList() {
    showLoading();
    try {
      const response = await fetch(API_ENDPOINT.LIST);
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch restaurant list');
    } finally {
      hideLoading();
    }
  }

  static async SearchRestaurant(query) {
    showLoading();
    try {
      const response = await fetch(API_ENDPOINT.SEARCH(query));
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to search restaurant');
    } finally {
      hideLoading();
    }
  }

  static async addReview(reviewer) {
    showLoading();
    try {
      const response = await fetch(API_ENDPOINT.ADD_REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: reviewer.id,
          name: reviewer.name,
          review: reviewer.review,
        }),
      });
      return response.json();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to add review');
    } finally {
      hideLoading();
    }
  }

  static async detailRestaurant(id) {
    showLoading();
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      const responseJson = await response.json();
      return responseJson.restaurant;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch restaurant details');
    } finally {
      hideLoading();
    }
  }

  static async fetchFavoriteRestaurantList() {
    showLoading();
    try {
      return FavoriteIdb.getAllRestaurants();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch favorite restaurants');
    } finally {
      hideLoading();
    }
  }

  static async addFavoriteRestaurant(restaurant) {
    showLoading();
    try {
      return FavoriteIdb.putRestaurant(restaurant);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to add favorite restaurant');
    } finally {
      hideLoading();
    }
  }

  static async removeFavoriteRestaurant(id) {
    showLoading();
    try {
      return FavoriteIdb.deleteRestaurant(id);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to remove favorite restaurant');
    } finally {
      hideLoading();
    }
  }

  static async isRestaurantFavorite(id) {
    showLoading();
    try {
      const restaurant = await FavoriteIdb.getRestaurant(id);
      return !!restaurant;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to check if restaurant is favorite');
    } finally {
      hideLoading();
    }
  }
}

export default RestaurantList;
