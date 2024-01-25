let canvas;
let canvasHtml;
let world;
let control = new Control();

function init(){
    initLevel();
    showCanvas();
    canvas = document.getElementById('canvas');
    world = new World(canvas,control);
}

function showCanvas(){
    let test = document.getElementById('fullscreen');
    let test1 = document.getElementById('start');

    test.classList.remove('hide');
    test1.classList.add('hide');
}

window.addEventListener('keydown',(e) => {
    //console.log(e.keyCode);
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
    if(e.keyCode == 68){
        control.D = true;
    }
});

window.addEventListener('keyup',(e) => {
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
    if(e.keyCode == 68){
        control.D = false;
    }
});

function fullscreen(){
    let fullscreen = document.getElementById('fullscreen');
    document.getElementById('canvas').classList.add('fullscreen');
    document.getElementById('disableFs').innerHTML = /*HTML*/`<button id='endFs' onclick='exitFullscreen(),resetAll()'>Disable Fullscreen</button>`;
    enterFullscreen(fullscreen);
}

function enterFullscreen(element){
    if(element.requestFullscreen){
        element.requestFullscreen();
    } else if(element.webkitRequestFullscreen){
        element.webkitRequestFullscreen();
    } else if(element.mozRequestFullScreen){
        element.mozRequestFullScreen();
    } else if(element.msRequestFullscreen){
        element.msRequestFullscreen();
    }
}  

function exitFullscreen(){
    if(document.exitFullscreen){
        document.exitFullscreen();
    } else if(document.webkitExitFullscreen){
        document.webkitExitFullscreen();
    } else if(document.mozCancelFullScreen){
        document.mozCancelFullScreen();
    } else if(document.msExitFullscreen){
        document.msExitFullscreen();
    }
}

function resetAll(){
    let canvasHtml = document.getElementById('canvas');
    document.getElementById('endFs').style.display = 'none';
    canvasHtml.classList.remove('fullscreen');
}

function audioOnOff(){
    document.getElementById('audioIconSwitch').classList.toggle('audio-off');
}

function openModal() {
    var modal = document.getElementById('storyModal');
    modal.classList.remove('hide');
}

function closeModal() {
    var modal = document.getElementById('storyModal');
    modal.classList.add('hide');
}
