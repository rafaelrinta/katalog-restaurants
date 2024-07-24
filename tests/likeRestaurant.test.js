import FavoriteDb from "../src/scripts/data/favoritedb-source";
import * as TestFactories from './helpers/testFactories';

describe('Liking A restaurant', () => {
    const addLikeButtonContainer = () => {
        document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    };

    beforeEach(() => {
        addLikeButtonContainer();
    });

    it('should show the like button when the restaurant has not been liked before', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

        expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy();
    });

    it('should not show the unlike button when the restaurant has not been liked before', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

        expect(document.querySelector('[aria-label="unlike this movie"]')).toBeFalsy();
    });

    it('should be able to like the restaurant', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

        document.querySelector('#likeButton').dispatchEvent(new Event('click'));

        // Memastikan restaurants berhasil disukai
        const restaurant = await FavoriteDb.getRestaurant(1);
        expect(restaurant).toEqual({ id: 1 });
        await FavoriteDb.deleteRestaurant(1);
    });

    it('should not add a restaurant again when its already liked', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

        // Tambahkan restaurant dengan ID 1 ke daftar restaurant yang disukai
        await FavoriteDb.putRestaurant({ id: 1 });

        // Simulasikan pengguna menekan tombol suka restaurant
        document.querySelector('#likeButton').dispatchEvent(new Event('click'));

        // Tidak ada restaurant yang ganda
        expect(await FavoriteDb.getAllRestaurants()).toEqual([{ id: 1 }]);
        await FavoriteDb.deleteRestaurant(1);
    });

    it('should not add a restaurant when it has no id', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({});

        document.querySelector('#likeButton').dispatchEvent(new Event('click'));
        expect(await FavoriteDb.getAllRestaurants()).toEqual([]);
    });
});