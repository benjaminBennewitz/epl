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

    constructor(x, y){
        super().loadImg('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_THROWN);
        this.loadImages(this.IMAGES_BREAK);
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 70;
        this.shoot();
    }

    shoot(){
        this.speedY = 20;
        this.gravity();
       // this.throwBottleAnimations();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }

    /*throwBottleAnimations() {
        let firstIntervalId, secondIntervalId;
    
        firstIntervalId = setInterval(() => {
            this.playAnimation(this.IMAGES_THROWN);
        }, 80);
    
        secondIntervalId = setInterval(() => {
            if (this.y < 90) {
                this.playAnimation(this.IMAGES_BREAK);
    
                clearInterval(firstIntervalId);
            }
        }, 1000/60);
    }*/
    
}