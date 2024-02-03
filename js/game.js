let canvas;
let canvasHtml;
let world;
let control = new Control();

bgMusic = new Audio('audio/level1_theme.mp3');
bgChickenSounds = new Audio('audio/chicken_sounds.mp3');
loseSound = new Audio('audio/lose.mp3');

const audioIconSwitch = document.getElementById('audioIconSwitch');

function init(){
    setInterval(checkAudio, 1000);
    initLevel();
    showCanvas();
    canvas = document.getElementById('canvas');
    world = new World(canvas,control);
}

function showCanvas(){
    let fullscreen = document.getElementById('fullscreen');
    let startScreen = document.getElementById('start');

    fullscreen.classList.remove('hide');
    startScreen.classList.add('hide');
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
    document.getElementById('activateFs').classList.add('hide');
    document.getElementById('disableFs').innerHTML = /*HTML*/`<button id='endFs' class="btn" onclick='exitFullscreen(),resetAll()'><div class="disable-fs"></div></button>`;
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
    document.getElementById('activateFs').classList.remove('hide');
    canvasHtml.classList.remove('fullscreen');
}

function audioOnOff(id){
    document.getElementById(id).classList.toggle('audio-off');
}

function openModal() {
    var modal = document.getElementById('storyModal');
    modal.classList.remove('hide');
}

function closeModal() {
    var modal = document.getElementById('storyModal');
    modal.classList.add('hide');
}

function showControls(){
    document.getElementById('showControls').classList.toggle('hide');
}

function playBgMusic(){
    bgMusic.play();
    bgMusic.volume = 0.2;
    bgMusic.loop = true;
}

function playBgSounds(){
    bgChickenSounds.play();
    bgChickenSounds.loop = true;
}

function playLoseSound(){
    loseSound.play();
    bgMusic.volume = 1.5;
}

function muteAll(){
    bgMusic.muted = true;
    bgChickenSounds.muted = true;
    loseSound.muted = true;
}

function unmuteAll(){
    bgMusic.muted = false;
    bgChickenSounds.muted = false;
    loseSound.muted = false;
}

function checkAudio() {
    const audioIconSwitch = document.getElementById('audioIconSwitch');

    switch (true) {
        case (audioIconSwitch && audioIconSwitch.classList.contains('audio-off')):
            muteAll();
            break;

        case (audioIconSwitch && audioIconSwitch.classList.contains('audio-on')):
            unmuteAll();
            playBgMusic();
            playBgSounds();
            break;

        default:
            break;
    }
}

function gameLost(){
        setTimeout(function() {
            if (world.character.life === 0) {
                loseSound.play();
                document.getElementById('start').classList.add('hide');
                document.getElementById('fullscreen').classList.add('hide');
                document.getElementById('showControls').classList.add('hide');
                document.getElementById('lost').classList.remove('hide');
                bgMusic.pause();
                bgChickenSounds.pause();
                world.muteItemSounds();
                killGame();
            }
        }, 800);
}

function gameWon(){
    setTimeout(function() {
        if (world.character.life === 0) {
            document.getElementById('start').classList.add('hide');
            document.getElementById('fullscreen').classList.add('hide');
            document.getElementById('showControls').classList.add('hide');
            document.getElementById('won').classList.remove('hide');
            bgMusic.pause();
            bgChickenSounds.pause();
            world.muteItemSounds();
            killGame();
        }
    }, 800);
}

function restart(){
    window.location.reload();
}

function killGame(){
    for (let i = 0; i < 9999; i++) {
        clearInterval(i);
    }
}