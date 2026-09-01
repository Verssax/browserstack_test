class MenuFooter {

    get webview () {
        return $('~Webview');
    }

    get login ()  {
        return $('~Login');
    }
    
    get forms ()  {
        return $('~Forms');
    }

    get swipe() {
        return $('~Swipe');
    }

    get drag() {
        return $('~Drag');
    }

    async tapLoginOption () {
        await this.login.click();
    }
    async tapWebviewOption () {
        await this.webview.click();
    }
    async tapFormsOption () {
        await this.forms.click();
    }
    async tapSwipeOption () {
        await this.swipe.click();
    }
    async tapDragOption () {
        await this.drag.click();
    }


}
export default new MenuFooter;