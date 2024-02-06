/**
 * Represents an end boss in the game.
 * @class
 * @extends MovingObjects
 */
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

    hurt_sound = new Audio('audio/hurt-boss.mp3');

    /**
     * Represents the constructor of the EndBoss class.
     * @constructor
     */
    constructor() {
        super().loadImg('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2200;
        this.speed = 0.5;
    }

    /**
     * Animates the end boss by continuously calling the moveLeft method at a rate of 60 frames per second.
     * Also calls the bossStart method.
     */
    animate(){
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.bossStart();
    }

    /**
     * Starts the boss behavior by setting up intervals for animations and checking for hurt status.
     */
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

    /**
     * Executes boss animations at regular intervals.
     * If the boss is hurt, it plays the hurt animation.
     * If the boss is defeated, it plays the dead animation.
     */
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

    /**
     * Mutes the character sounds.
     */
    muteCharSounds(){
        this.hurt_sound.muted = true;
    }
    
    /**
     * Unmutes the character sounds.
     */
    unmuteCharSounds(){
        this.hurt_sound.muted = false;
    }
    
    /**
     * Checks the character sounds and performs actions based on the audio icon switch state.
     * @param {HTMLAudioElement} getSound - The sound to be played when the audio icon switch is on.
     */
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