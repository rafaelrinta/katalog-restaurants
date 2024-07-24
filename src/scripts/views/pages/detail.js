// detail.js

import UrlParser from '../../routes/url-parser';
import RestaurantList from '../../data/restaurantdb-source';
import { createLikeRestaurantButtonTemplate, createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonPresenter from '../../utils/LikeButtonPresenter';

const Detail = {
  async render() {
    return `
      <div id="restaurant" class="restaurant"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantList.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#restaurant');
    const likeButtonContainer = document.querySelector("#likeButtonContainer");

    if (restaurant) {
      restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

      const reviewForm = document.querySelector('#reviewForm');
      reviewForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const reviewName = document.querySelector('#reviewName').value;
        const reviewText = document.querySelector('#reviewText').value;

        const review = {
          id: restaurant.id,
          name: reviewName,
          review: reviewText,
        };

        const response = await RestaurantList.addReview(review);
        if (response.error === false) {
          const newReview = response.customerReviews[response.customerReviews.length - 1];
          const reviewContainer = document.querySelector('.reviews__item');
          reviewContainer.innerHTML += `
            <div class="review">
              <p><strong>${newReview.name}</strong></p>
              <p>${newReview.review}</p>
              <p>${newReview.date}</p>
            </div>
          `;
        }
      });
    } else {
      restaurantContainer.innerHTML = '<p>Restaurant data is not available.</p>';
    }

    likeButtonContainer.innerHTML = createLikeRestaurantButtonTemplate();

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
        city: restaurant.city,
        rating: restaurant.rating,
      },
    });
  },
  catch(error) {
    console.error("Error in rendering the detail page:", error);
  },
};

export default Detail;
