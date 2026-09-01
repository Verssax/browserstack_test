import formScreen from "../pageObjects/form.screen.js";


describe('Form screen tests', () => {
    beforeEach(async () => {
        await formScreen.menu.tapFormsOption();
        await formScreen.textField.waitForDisplayed();

    });

    it('Data entered  in the fields should be displayed in respectable fields and switches/buttons work properly', async () => {

        await formScreen.fillForm('test')
        await expect(formScreen.textResult).toHaveText('test');
        await expect(formScreen.switchTextResult).toHaveText('OFF', { containing: true });
        await expect(formScreen.dropdown).toHaveText('Appium is awesome');

        await formScreen.tapActiveBtn();
        await expect(formScreen.activeBtnAlert).toBeDisplayed();
        await formScreen.activeBtnChooseOK();
        await expect(formScreen.activeBtnAlert).not.toExist();

    })
})