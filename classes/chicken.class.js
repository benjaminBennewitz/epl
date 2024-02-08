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

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    life = 1;

   /**
     * Represents a Chicken object and its position.
     * @constructor
     */
    constructor(){
        super().loadImg('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 500 + Math.random() * (2600 - 500);
        this.speed = 0.25 + Math.random() * 1.0;
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
        this.chickenDeadImg();
    }

    /**
     * Executes chicken animations at regular intervals.
     * If the chicken is hurt, it plays the dead animation.
     */
    chickenDeadImg(){
        this.loadImg(this.IMAGES_DEAD);
    }
}