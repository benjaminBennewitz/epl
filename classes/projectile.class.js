class Projectiles extends MovingObjects{

    constructor(x, y){
        super().loadImg('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 60;
        this.shoot();
    }

    shoot(){
        this.speedY = 30;
        this.gravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}