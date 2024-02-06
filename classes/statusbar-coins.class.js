/**
 * Represents a coin bar in the game.
 * @class
 * @extends DrawableObject
 */
class CoinBar extends DrawableObject {
    
    IMAGES_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    percentage = 0;

    /**
     * Represents the constructor of the StatusBarCoins class.
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.x = 10;   
        this.y = 50;
        this.width = 200;
        this.height = 50;
        this.setCollectedCoins(0);
    }

    /**
     * Sets the collected coins percentage and updates the image accordingly.
     * @param {number} percentage - The percentage of collected coins.
     */
    setCollectedCoins(percentage){
        this.percentage = percentage;
        let path = this.IMAGES_COINS[this.checkImgIndex()];
        this.img = this.images[path];
    }

    /**
     * Returns the image index based on the percentage value.
     * @returns {number} The image index.
     */
    checkImgIndex(){
        if(this.percentage == 100){
            return 5;
        } else if (this.percentage > 80){
            return 4;
        } else if (this.percentage > 60){
            return 3;
        } else if (this.percentage > 40){
            return 2;
        } else if (this.percentage > 20){
            return 1;
        } else {
            return 0;
        }
    }
}
