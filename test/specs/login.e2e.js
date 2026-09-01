import loginScreen from "../pageObjects/login.screen.js";
import generateUser from "../utils/utils.js";
 
describe('Login screen tests', () => {
    beforeEach(async () => {
        await loginScreen.menu.tapLoginOption();
        await loginScreen.emailField.waitForDisplayed();

    });

    it('should show error massage on login with invalid credentials ', async () => {
        const user = await generateUser();
        await loginScreen.fillLoginInfo(user.firstName, user.password);
        await loginScreen.loginBtn.click();
        await expect(loginScreen.invalidEmailErrMsg).toBeDisplayed();

    })
})






