class Character extends MovingObjects{

    height = 300;
    y = 135;
    world;
    speed = 10;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    constructor(){
        super().loadImg('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
}

    animate(){

        setInterval(() => {
            if(this.world.control.RIGHT){
                this.x += this.speed;
                this.turnArround = false;
            }
            if(this.world.control.LEFT){
                this.x -= this.speed;
                this.turnArround = true;
            }
        }, 1000 / 60);

        setInterval(() => {
            if(this.world.control.RIGHT || this.world.control.LEFT){
                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.images[path];
                this.currentImage++;  
            }
        },30);
    }

    jump(){

    }
}