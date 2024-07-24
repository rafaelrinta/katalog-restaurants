import LikeButtonPresenter from "../../src/scripts/utils/LikeButtonPresenter";

const createLikeButtonPresenterWithRestaurant = async (restaurant) => {
    await LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant,
    });
  };
  export { createLikeButtonPresenterWithRestaurant };