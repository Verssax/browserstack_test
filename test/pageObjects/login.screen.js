import BaseScreen from "./base.screen.js";

class LoginScreen extends BaseScreen {


    get emailField () {
        return $('~input-email');
    }

    get paswordFiled ()  {
        return $('~input-password'); 
    }

    get loginBtn () {
        return $('~button-LOGIN'); 
    }

    get invalidEmailErrMsg () {
        return $('//android.widget.TextView[@text="Please enter a valid email address"]')
    }

    async fillLoginInfo (username, password) {
        await this.emailField.setValue(username);
        await this.paswordFiled.setValue(password);
        await driver.hideKeyboard();
    }

}

export default new LoginScreen;
