class Endboss extends MovingObjects {

    height = 400;
    width = 400;
    y = 45;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
        super().loadImg('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2200;
        this.speed = 0.5;
    }

    hurt_sound = new Audio('audio/hurt-boss.mp3');

    animate(){
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.bossStart();
    }

    bossStart(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        },700);

        setInterval(() => {
            this.playAnimation(this.IMAGES_ATTACK);
        }, 3000);

        setInterval(() => {
            if(this.isHurt()){
                this.hurt_sound.play();
                this.hurt_sound.volume = 0.2;
                this.checkCharSounds(this.hurt_sound);
            }
        }, 100);

        this.bossAnimations();
    }

    bossAnimations(){
        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
            if (this.isDefeated()) {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 80);
    }

    muteCharSounds(){
        this.hurt_sound.muted = true;
    }
    
    unmuteCharSounds(){
        this.hurt_sound.muted = false;
    }
    
    checkCharSounds(getSound) {
        const audioIconSwitch = document.getElementById('audioIconSwitch');
    
        switch (true) {
            case (audioIconSwitch && audioIconSwitch.classList.contains('audio-off')):
                this.muteCharSounds();
                break;
    
            case (audioIconSwitch && audioIconSwitch.classList.contains('audio-on')):
                this.unmuteCharSounds()
                getSound.play();
                break;
    
            default:
                break;
        }
    }
}