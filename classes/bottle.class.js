/**
 * Represents a Bottle object.
 * @extends DrawableObject
 */
class Bottle extends DrawableObject {
    IMAGES_BOTTLES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    height = 70;
    width = 70;

    offset = {
        top: -50,
        left: -5,
        right: 10,
        bottom: 0
    };
   
    /**
     * Represents a Bottle object.
     * @constructor
     */
    constructor(){
        super().loadImg('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = 700 + Math.random() * (2700 - 700);
        this.y = 350;
        this.animate();
    }

    /**
     * Animates the bottle by repeatedly playing the animation.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLES);
        }, 1000 / 2);
    }

    /**
     * Plays the animation by updating the image of the bottle.
     * @param {string[]} images - An array of image paths.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.images[path];
        this.currentImage++;
    }
}