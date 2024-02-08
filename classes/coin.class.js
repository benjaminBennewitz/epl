/**
 * Represents a Coin object.
 * @extends DrawableObject
 */
class Coin extends DrawableObject {
    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    height = 60;
    width = 60;
   
    /**
     * Represents a Coin object and its position.
     * @constructor
     */
    constructor(){
        super().loadImg('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = 500 + Math.random() * (2000 - 500);
        this.y = 50 + Math.random() * (250 - 100);
        this.animate();
    }    

    /**
     * Animates the coin by repeatedly calling the playAnimation method.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 1000 / 2);
    }

    /**
     * Plays the animation for the coin.
     * 
     * @param {string[]} images - An array of image paths.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.images[path];
        this.currentImage++;
    }
}