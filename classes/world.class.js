class World{
    canvas;
    ctx;
    control;

    character = new Character();

    enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    ];

    clouds = [
        new Cloud(),
    ]

    backgroundObjects = [
        new Background('img/5_background/layers/air.png', 0),

        new Background('img/5_background/layers/3_third_layer/1.png', 0),
        new Background('img/5_background/layers/3_third_layer/2.png', 0),

        new Background('img/5_background/layers/2_second_layer/1.png', 0),
        new Background('img/5_background/layers/2_second_layer/2.png', 0),

        new Background('img/5_background/layers/1_first_layer/1.png', 0),
        new Background('img/5_background/layers/1_first_layer/2.png', 0),
    ]

    
    constructor(canvas, control){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.control = control;
        this.draw();
        this.setWorld();
    }

    setWorld(){
        this.character.world = this;
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.objectsLoop(this.backgroundObjects);
        this.addToWorld(this.character);
        this.objectsLoop(this.enemies);
        this.objectsLoop(this.clouds);

        //draw() calls itself again and again 
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }

    // help fuction to loop through objects
    objectsLoop(objects){
        objects.forEach((object) => {
            this.addToWorld(object);
        });
    }

    // fuction to add objects to the world/canvas
    addToWorld(object){
        if(object.turnArround){
            this.ctx.save();
            this.ctx.translate(object.width, 0);
            this.ctx.scale(-1,1);
            object.x = object.x * -1;
        }
        this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
        if(object.turnArround){
            object.x = object.x * -1;
            this.ctx.restore();
        }
    }
}