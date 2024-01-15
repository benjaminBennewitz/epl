class Cloud extends MovingObjects{

    height = 250;
    width = 500;

    constructor(){
        super().loadImg('img/5_background/layers/4_clouds/1.png');

        this.x = 0 + Math.random() * 500;
    }
}