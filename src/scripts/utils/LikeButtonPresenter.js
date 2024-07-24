/* eslint-disable operator-linebreak */
import FavoriteDb from "../data/favoritedb-source";
import {
    createLikeRestaurantButtonTemplate,
    createUnlikeRestaurantButtonTemplate,
} from "../views/templates/template-creator";

const LikeButtonPresenter = {
    async init({ likeButtonContainer, restaurant }) {
        this._likeButtonContainer = likeButtonContainer;
        this._restaurant = restaurant;

        await this._renderButton();
    },

    async _isrestaurantExist(id) {
        const restaurant = await FavoriteDb.getRestaurant(id);
        return !!restaurant;
    },

    async _renderButton() {
        const { id } = this._restaurant;

        if (await this._isrestaurantExist(id)) {
            this._renderLiked();
        } else {
            this._renderLike();
        }
    },

    _renderLike() {
        this._likeButtonContainer.innerHTML = createLikeRestaurantButtonTemplate();
        const likeButton = document.querySelector("#likeButton");
        likeButton.addEventListener("click", async () => {
            await FavoriteDb.putRestaurant(this._restaurant);
            this._renderButton();
        });
    },

    _renderLiked() {
        this._likeButtonContainer.innerHTML =
            createUnlikeRestaurantButtonTemplate();
        const likeButton = document.querySelector("#likeButton");
        likeButton.addEventListener("click", async () => {
            await FavoriteDb.deleteRestaurant(this._restaurant.id);
            this._renderButton();
        });
    },
};

export default LikeButtonPresenter;
