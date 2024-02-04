class MiniChicken extends MovingObjects{

    height = 50;
    width = 50;
    y = 370;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];

    constructor(){
        super().loadImg('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 800 + Math.random() * 1500;
        this.speed = 0.25 + Math.random() * 0.65;
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        },200);
        this.chickenAnimations();
    }

    chickenAnimations(){
        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 80);
    }
}