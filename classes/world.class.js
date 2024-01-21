class World{
    canvas;
    ctx;
    control;
    camera_x = 0;

    character = new Character();
    level = level_1;

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
        this.ctx.translate(this.camera_x,0);

        this.objectsLoop(this.level.backgroundObjects);
        this.addToWorld(this.character);
        this.objectsLoop(this.level.enemies);
        this.objectsLoop(this.level.clouds);

        this.ctx.translate(-this.camera_x,0);

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
            this.flipImage(object);
        }

        object.draw(this.ctx);
        object.collisionBorder(this.ctx);

        if(object.turnArround){
            this.flipImageBack(object);
        }
    }

    flipImage(object){
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1,1);
        object.x = object.x * -1;
    }

    flipImageBack(object){
        object.x = object.x * -1;
        this.ctx.restore();
    }
}