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
        'img/2_character_pepe/2_walk/W-26.png'
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
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    walking_sound = new Audio('audio/walking.mp3');

    constructor(){
        super().loadImg('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.animate();
        this.gravity();
    }

    checkAudio(){
        const audioIconSwitch = document.getElementById('audioIconSwitch');
        if (audioIconSwitch && audioIconSwitch.classList.contains('audio-off')){
            this.walking_sound.pause();
        } else if (audioIconSwitch && audioIconSwitch.classList.contains('audio-on')){
            this.walking_sound.play();
        }
    }

    animate(){
        setInterval(() => {
            this.walking_sound.pause();
            
            if(this.world.control.RIGHT && this.x < this.world.level.level_end_x){
                this.moveRight();
                this.turnArround = false;
                this.checkAudio();
            }

            if(this.world.control.LEFT && this.x > 0){
                this.moveLeft();
                this.turnArround = true;
                this.checkAudio();
            }

            if(this.world.control.SPACE && !this.isJumpTrue()){
                this.jump();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        this.walking_sound.playbackRate = this.audioSpeed;

        setInterval(() => {
            if(this.isDead()){
                this.playAnimation(this.IMAGES_DEAD);
            } else if(this.isHurt()){
                this.playAnimation(this.IMAGES_HURT);
            }
            else if(this.isJumpTrue()){
                this.playAnimation(this.IMAGES_JUMPING);
            }else {
                if(this.world.control.RIGHT || this.world.control.LEFT){
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        },40);
    }

    jump(){
        this.speedY = 30;
    }
    
}