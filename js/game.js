let canvas;
let canvasHtml;
let world;
let control = new Control();

loseSound = new Audio('audio/lose.mp3');
winSound = new Audio('audio/win_game.mp3');

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


document.addEventListener('DOMContentLoaded', (event) => {

    window.addEventListener('keydown', (e) => {
        handleKey(e.keyCode, true);
    });

    window.addEventListener('keyup', (e) => {
        handleKey(e.keyCode, false);
    });

    document.getElementById('mobileLeft').addEventListener('touchstart', () => {
        control.LEFT = true;
    });

    document.getElementById('mobileLeft').addEventListener('touchend', () => {
        control.LEFT = false;
    });

    document.getElementById('mobileThrow').addEventListener('touchstart', () => {
        control.D = true;
    });

    document.getElementById('mobileThrow').addEventListener('touchend', () => {
        control.D = false;
    });

    document.getElementById('mobileJump').addEventListener('touchstart', () => {
        control.SPACE = true;
    });

    document.getElementById('mobileJump').addEventListener('touchend', () => {
        control.SPACE = false;
    });

    document.getElementById('mobileRight').addEventListener('touchstart', () => {
        control.RIGHT = true;
    });

    document.getElementById('mobileRight').addEventListener('touchend', () => {
        control.RIGHT = false;
    });

    function handleKey(keyCode, isPressed) {
        switch (keyCode) {
            case 39:
                control.RIGHT = isPressed;
                break;
            case 37:
                control.LEFT = isPressed;
                break;
            case 32:
                control.SPACE = isPressed;
                break;
            case 38:
                control.UP = isPressed;
                break;
            case 40:
                control.DOWN = isPressed;
                break;
            case 68:
                control.D = isPressed;
                break;
            default:
                break;
        }
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

function muteAll(){
    loseSound.muted = true;
    winSound.muted = true;
}

function unmuteAll(){
    loseSound.muted = false;
    winSound.muted = false;
}

function checkAudio() {
    const audioIconSwitch = document.getElementById('audioIconSwitch');

    switch (true) {
        case (audioIconSwitch && audioIconSwitch.classList.contains('audio-off')):
            muteAll();
            break;

        case (audioIconSwitch && audioIconSwitch.classList.contains('audio-on')):
            unmuteAll();
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
                boss_stage_sound.pause();
                world.muteItemSounds();
                killGame();
            }
        }, 500);
}

function gameWon(){
    setTimeout(function() {
        if (world.level.boss[0].life === 0) {
            winSound.play();
            winSound.volume = 0.2;
            document.getElementById('start').classList.add('hide');
            document.getElementById('fullscreen').classList.add('hide');
            document.getElementById('showControls').classList.add('hide');
            document.getElementById('won').classList.remove('hide');
            killGame();
        }
    }, 100);
}

function restart(){
    window.location.reload();
}

function killGame(){
    for (let i = 0; i < 9999; i++) {
        clearInterval(i);
    }
    bgMusic.pause();
    world.character.muteCharSounds();
    bgChickenSounds.pause();
    boss_stage_sound.pause();
    world.muteItemSounds();
}
  
  