/**
 * Represents a projectile in the game.
 * @class
 * @extends MovingObjects
 */
class Projectiles extends MovingObjects{

    IMAGES_THROWN = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_BREAK = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    /**
     * Represents a Projectile object.
     * @constructor
     * @param {number} x - The x-coordinate of the projectile.
     * @param {number} y - The y-coordinate of the projectile.
     */
    constructor(x, y){
        super().loadImg('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_THROWN);
        this.loadImages(this.IMAGES_BREAK);
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 70;
        this.animate();
    }

    /**
     * Shoots the projectile.
     * @returns {void}
     */
    animate(){
        this.speedY = 20;
        this.gravity();
        this.throwAnimation();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }

    /**
     * Plays the throw bottle animations and updates the position of the projectile.
     */
    throwAnimation() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_THROWN);
        }, 100);
    }

    bottleBreak(){
        let splash_interval = setInterval(() => {
            this.playAnimation(this.IMAGES_BREAK);
            if(this.currentImage == this.IMAGES_BREAK.length - 1){
                clearInterval(splash_interval);
                splash_interval = null;
                this.isFadingOut=true
            }
        }, 1000 / 60);
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