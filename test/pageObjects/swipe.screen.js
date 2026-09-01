import BaseScreen from "./base.screen.js";

class SwipeScreen extends BaseScreen {


    get webdriverLogo () {
        return $('~WebdriverIO logo');
    }
    get swipeScreem () {
        return $('~Swipe-screen');
    }

    get fullyOpenCard () {
        return $('//android.widget.TextView[@text="FULLY OPEN SOURCE"]');
    }

    get SupVidCard () {
        return $('//android.widget.TextView[@text="SUPPORT VIDEOS"]'); 
    }

    async scrollDownToLogo() {
        await this.scrollUntilVisible( () => this.webdriverLogo)
    }

    async swipeLeft () {
        await this.swipeUntilVisible( () => this.SupVidCard)
    }
    

}

export default new SwipeScreen;
