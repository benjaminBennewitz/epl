class Character extends MovingObjects{

    height = 300;
    y = 135;
    world;
    speed = 10;
    audioSpeed = 1.5;
    speedY = 0;
    acceleration = 1.5;

    idleTimer = 0;
    idleThreshold = 1000;
    longIdleTimer = 0;
    longIdleThreshold = 3500;

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

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONGIDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];


    walking_sound = new Audio('audio/walking.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
   // idle_sound = new Audio('audio/idle.mp3');
    //longIdle_sound = new Audio('audio/longIdle.mp3');

    constructor(){
        super().loadImg('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
        this.animate();
        this.gravity();
    }

    checkAudio(){
        const audioIconSwitch = document.getElementById('audioIconSwitch');
        if (audioIconSwitch && audioIconSwitch.classList.contains('audio-off')){
            this.walking_sound.pause();
            this.hurt_sound.pause();
        } else if (audioIconSwitch && audioIconSwitch.classList.contains('audio-on')){
            this.walking_sound.play();
            this.hurt_sound.play();
        }
    }

    animate(){
        setInterval(() => {
            this.walking_sound.pause();
            this.hurt_sound.pause();
            
            if(this.world.control.RIGHT && this.x < this.world.level.level_end_x){
                this.moveRight();
                this.turnArround = false;
                this.checkAudio();
                this.hurt_sound.pause();
            }

            if(this.world.control.LEFT && this.x > 0){
                this.moveLeft();
                this.turnArround = true;
                this.checkAudio();
                this.hurt_sound.pause();
            }

            if(this.isHurt()){
                this.checkAudio();
            }

            if(this.world.control.SPACE && !this.isJumpTrue()){
                this.jump();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        this.walking_sound.playbackRate = this.audioSpeed;

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isJumpTrue()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.control.RIGHT || this.world.control.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
                this.idleTimer = 0;
                this.longIdleTimer = 0;
            } else {
                this.idleTimer += 80;
                this.longIdleTimer += 80;

                if (this.idleTimer >= this.idleThreshold) {
                    this.playAnimation(this.IMAGES_IDLE);
                }
                if (this.longIdleTimer >= this.longIdleThreshold) {
                    this.playAnimation(this.IMAGES_LONGIDLE);
                }
            }
        }, 80);
    }
    

    jump(){
        this.speedY = 30;
    }
    
}