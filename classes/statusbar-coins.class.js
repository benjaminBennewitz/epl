MAX_COINS = 20;
class CoinBar extends DrawableObject {
    
    IMAGES_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    collectedCoins = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.x = 10;   
        this.y = 50;
        this.width = 200;
        this.height = 50;
        this.setCollectedCoins(0);
    }


    setCollectedCoins(count) {
        this.collectedCoins = count;
        let path = this.IMAGES_COINS[this.checkImgIndex()];
        this.img = this.images[path];
    }

    
    checkImgIndex() {
        let percentage = (this.collectedCoins / MAX_COINS) * 100;

        if (percentage >= 80) {
            return 5;
        } else if (percentage >= 60) {
            return 4;
        } else if (percentage >= 40) {
            return 3;
        } else if (percentage >= 20) {
            return 2;
        } else if (percentage > 0) {
            return 1;
        } else {
            return 0;
        }
    }
}
