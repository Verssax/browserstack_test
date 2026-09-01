import MenuFooter from './components/menu.screen.js'

class BaseScreen{
    constructor() {
        this.menu =  MenuFooter;
    };   

    async scrollUntilVisible(selectorFn, { direction = 'up', maxSwipes = 8, percent = 0.7 } = {}) {
        for (let i = 0; i < maxSwipes; i++) {
            const el = await selectorFn();
            if (await el.isExisting()) {
                const displayed = await el.isDisplayed().catch(() => false);
                if (displayed) return el;
            }

            const { width, height } = await driver.getWindowSize();
            await driver.execute('mobile: swipeGesture', {
                left: width * 0.1,
                top: height * 0.2,
                width: width * 0.8,
                height: height * 0.6,
                direction,
                percent,
            });
        }

        throw new Error('Element not found after max scroll attempts');
    }
    
    async swipeUntilVisible(selectorFn, { direction = 'left', maxSwipes = 15, distance = 300, settleTime = 500 } = {}) {
        for (let i = 0; i < maxSwipes; i++) {
            const el = await selectorFn();
            if (await el.isExisting()) {
                const displayed = await el.isDisplayed().catch(() => false);
                if (displayed) return el;
            }

            const { width, height } = await driver.getWindowSize();
            const startX = direction === 'left' ? width * 0.8 : width * 0.2;
            const endX = direction === 'left' ? startX - distance : startX + distance;
            const y = height * 0.5;

            await driver.execute('mobile: dragGesture', {
                startX: Math.round(startX),
                startY: Math.round(y),
                endX: Math.round(endX),
                endY: Math.round(y),
                speed: 500, 
            });

            await driver.pause(settleTime); 
        }

        throw new Error('Element not found after max swipe attempts');
    }

    async customDragAndDrop(sourceEl, targetEl) {
        const sourceLocation = await sourceEl.getLocation();
        const sourceSize = await sourceEl.getSize();
        const targetLocation = await targetEl.getLocation();
        const targetSize = await targetEl.getSize();

        const startX = Math.round(sourceLocation.x + sourceSize.width / 2);
        const startY = Math.round(sourceLocation.y + sourceSize.height / 2);
        const endX = Math.round(targetLocation.x + targetSize.width / 2);
        const endY = Math.round(targetLocation.y + targetSize.height / 2);

        await driver.execute('mobile: dragGesture', {
            startX,
            startY,
            endX,
            endY,
        });
    }
    
}

export default BaseScreen;