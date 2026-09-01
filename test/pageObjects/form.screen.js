import BaseScreen from "./base.screen.js";

class FormScreen extends BaseScreen {


    get textField () {
        return $('~text-input');
    }

    get textResult ()  {
        return $('~input-text-result'); 
    }

    get switch () {
        return $('~switch'); 
    }

    get switchTextResult () {
        return $('~switch-text'); 
    }

    get dropdown () { 
        return $('//android.view.ViewGroup[@content-desc="Dropdown"]/android.view.ViewGroup/android.widget.EditText');  
    }

    get dropdownMenu () { 
        return $('android=new UiSelector().resourceId("com.wdiodemoapp:id/select_dialog_listview")');
    }

    get dropdownMenuOptions () { 
        return $$('android=new UiSelector().resourceId("android:id/text1")');
    }

    get activeBtnAlert () { 
        return $('android=new UiSelector().resourceId("android:id/parentPanel")'); 
    }

    get activeBtnAlertOk () {
        return $('android=new UiSelector().resourceId("android:id/button1")'); 
    }

    get activeBtn() {
        return $('~button-Active');
    }

    async fillForm(text) {
        await this.textField.setValue(text);
        await driver.hideKeyboard();
        await this.switch.click();
        await this.dropdown.click();
        await this.dropdownMenu.waitForDisplayed();
        await this.dropdownMenuOptions[2].click(); 
    }

    async tapActiveBtn() {
        await this.activeBtn.click();
    }

    async activeBtnChooseOK(){
        await this.activeBtnAlertOk.click();
    }
}

export default new FormScreen;