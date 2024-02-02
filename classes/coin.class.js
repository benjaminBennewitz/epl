class Coin extends DrawableObject {
    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    height = 80;
    width = 80;
   
    constructor(){
        super().loadImg('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = 500 + Math.random() * 2000;
        this.y = 100 + Math.random() * 150;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 1000 / 2);
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.images[path];
        this.currentImage++;
    }
}