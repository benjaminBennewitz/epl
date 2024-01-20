let canvas;
let world;
let control = new Control();

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas,control);

    console.log('Character = ', world.character);
}

window.addEventListener("keydown",(e) => {
    if(e.keyCode == 39){
        control.RIGHT = true;
    }
    if(e.keyCode == 37){
        control.LEFT = true;
    }
    if(e.keyCode == 32){
        control.SPACE = true;
    }
    if(e.keyCode == 38){
        control.UP = true;
    }
    if(e.keyCode == 40){
        control.DOWN = true;
    }
    console.log(e);
});

window.addEventListener("keyup",(e) => {
    if(e.keyCode == 39){
        control.RIGHT = false;
    }
    if(e.keyCode == 37){
        control.LEFT = false;
    }
    if(e.keyCode == 32){
        control.SPACE = false;
    }
    if(e.keyCode == 38){
        control.UP = false;
    }
    if(e.keyCode == 40){
        control.DOWN = false;
    }
    console.log(e);
});