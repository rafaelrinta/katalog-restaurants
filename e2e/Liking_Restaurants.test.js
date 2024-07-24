const assert = require('assert');
Feature('Liking Restaurants');

Before(({ I }) => {
    I.amOnPage("/#/favorite");
});

Scenario("showing empty liked restaurants", ({ I }) => {
    I.seeElement("#restaurants");
    I.see("No favorite restaurants to display", "p");
});

Scenario("liking one restaurant", async ({ I }) => {
    I.see("No favorite restaurants to display", "p");

    I.amOnPage("/");

    I.seeElement(".restaurant-item__name a");
    const firstRestaurant = locate('.restaurant-item__name a').first();
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);

    I.seeElement("#likeButton");
    I.click("#likeButton");

    I.amOnPage("/#/favorite");
    I.seeElement(".restaurant-item");

    const likedRestaurantTitle = await I.grabTextFrom('.restaurant-item__name');

    assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario("unliking one restaurant", ({ I }) => {
    I.see("No favorite restaurants to display", "p");

    I.amOnPage("/#/favorite");

    I.see("No favorite restaurants to display", "p");

    I.amOnPage("/");

    I.seeElement(".restaurant-item__name a");
    I.click(locate(".restaurant-item__name a").first());

    I.seeElement("#likeButton");
    I.click("#likeButton");

    I.amOnPage("/#/favorite");
    I.seeElement(".restaurant-item");

    I.click(locate(".restaurant-item__name a").first());

    I.seeElement("#likeButton");
    I.click("#likeButton");

    I.amOnPage("/#/favorite");
    I.see("No favorite restaurants to display", "p");
});

Scenario('Add Review', async ({ I }) => {
    I.see("No favorite restaurants to display", "p");

    I.amOnPage("/");

    I.seeElement(".restaurant-item__name a");
    I.click(locate(".restaurant-item__name a").first());

    I.seeElement("#reviewForm");
    
    const reviewName = "Rafael";
    const reviewText = "Enak iki boloo";
    
    I.fillField("#reviewName", reviewName);
    I.fillField("#reviewText", reviewText);
    I.click('button[type="submit"]');
    
    I.wait(2);

    I.see(reviewName, ".reviews__item .review p strong");
    I.see(reviewText, ".reviews__item .review p");
});
