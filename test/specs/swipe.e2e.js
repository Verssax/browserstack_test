import swipeScreen from "../pageObjects/swipe.screen.js";

describe('Swipe screen tests', () => {
    beforeEach(async () => {
        await swipeScreen.menu.tapSwipeOption();
        await swipeScreen.swipeScreem.waitForDisplayed();

    });

    it('Should swipe until card is visible', async () => {
        await swipeScreen.swipeLeft();
        await expect(swipeScreen.SupVidCard).toBeDisplayed();
    })

    it('Should scroll until logo is visible', async () => {
        await swipeScreen.scrollDownToLogo();
        await expect(swipeScreen.webdriverLogo).toBeDisplayed();
    })



})