class Cloud extends MovingObjects{

    y = 20;
    x = 200;
    height = 250;
    width = 500;

    constructor(){
        super().loadImg('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 2000 + 50;
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.x -= 1;
        }, 1000 / 60);
    }
}