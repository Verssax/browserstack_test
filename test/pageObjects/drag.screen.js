import BaseScreen from "./base.screen.js";

class DragScreen extends BaseScreen {

    get drop2 () { 
        return $('~drop-c2');
    }

    get drag2 () { 
        return $('//android.view.ViewGroup[@content-desc="drag-c2"]/android.widget.ImageView') 
    }

    get renew () { 
        return $('~renew')
    }

    async dragAndDrop() {
 
        await this.customDragAndDrop(this.drag2, this.drop2);
    }

    async tapRenew() {
        await this.renew.click();
    }

}

export default new DragScreen;