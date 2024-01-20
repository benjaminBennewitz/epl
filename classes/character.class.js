class Character extends MovingObjects{

    height = 300;
    y = 135;
    world;
    speed = 10;
    audioSpeed = 1.5;
    speedY = 0;
    acceleration = 1.5;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    walking_sound = new Audio('audio/walking.mp3');

    constructor(){
        super().loadImg('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.animate();
        this.gravity();
}

    animate(){

        setInterval(() => {
            this.walking_sound.pause();
            if(this.world.control.RIGHT && this.x < this.world.level.level_end_x){
                this.moveRight();
                this.turnArround = false;
                this.walking_sound.play();
            }
            if(this.world.control.LEFT && this.x > 0){
                this.moveLeft();
                this.turnArround = true;
                this.walking_sound.play();
            }

            if(this.world.control.SPACE && !this.isJumpTrue()){
                this.jump();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        this.walking_sound.playbackRate = this.audioSpeed;

        setInterval(() => {
            if(this.world.control.RIGHT || this.world.control.LEFT){
                this.playAnimation(this.IMAGES_WALKING);
            }else{

                if(this.isJumpTrue()){
                    this.playAnimation(this.IMAGES_JUMPING);
                }
            }
        },40);
    }

    jump(){
        this.speedY = 30;
    }
}