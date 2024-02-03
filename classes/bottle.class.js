class Bottle extends DrawableObject {
    IMAGES_BOTTLES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    height = 70;
    width = 70;
   
    constructor(){
        super().loadImg('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = 700 + Math.random() * 2000;
        this.y = 360;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLES);
        }, 1000 / 2);
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.images[path];
        this.currentImage++;
    }
}