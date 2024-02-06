/**
 * Represents a Chicken object that extends MovingObjects.
 * @class
 */
class Chicken extends MovingObjects{

    height = 80;
    width = 80;
    y = 350;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];

    /**
     * Represents a Chicken object.
     * @constructor
     */
    constructor(){
        super().loadImg('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 800 + Math.random() * 1250;
        this.speed = 0.25 + Math.random() * 0.85;
        this.animate();
    }

    /**
     * Animates the chicken by continuously moving it left and playing the walking animation.
     */
    animate(){
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        },200);
        this.chickenAnimations();
    }

    /**
     * Executes chicken animations at regular intervals.
     * If the chicken is hurt, it plays the dead animation.
     */
    chickenAnimations(){
        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 80);
    }
}