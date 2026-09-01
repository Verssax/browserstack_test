import dragScreen from "../pageObjects/drag.screen.js";

describe('Drag and drop screen tests', () => {
    beforeEach(async () => {
        await dragScreen.menu.tapDragOption();
        await dragScreen.drag2.waitForDisplayed();

    });
    it('Should drag and drop the piece and after taping renew the piece resets', async () => {
        await dragScreen.dragAndDrop();
        await expect(dragScreen.drop2).not.toExist();
        await expect(dragScreen.drop2).not.toExist();

        await dragScreen.tapRenew();
        await expect(dragScreen.drop2).toExist();
        await expect(dragScreen.drop2).toExist();

    })
})