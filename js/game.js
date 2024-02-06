let canvas;
let canvasHtml;
let world;
let control = new Control();
let loseSound = new Audio('audio/lose.mp3');
let winSound = new Audio('audio/win_game.mp3');
const audioIconSwitch = document.getElementById('audioIconSwitch');

/**
 * Initializes the game.
 */
function init() {
    setInterval(checkAudio, 1000);
    initLevel();
    showCanvas();
    canvas = document.getElementById('canvas');
    world = new World(canvas, control);
}

window.addEventListener("load",function() {
    setTimeout(function(){
        // This hides the address bar:
        window.scrollTo(0, 1);
    }, 0);
});

/**
 * Shows the canvas by removing the 'hide' class from the fullscreen element and adding it to the startScreen element.
 */
function showCanvas() {
    let fullscreen = document.getElementById('fullscreen');
    let startScreen = document.getElementById('start');

    fullscreen.classList.remove('hide');
    startScreen.classList.add('hide');
}

// Event listeners and handlers for the touch controls.

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

    /**
     * Handles the key events.
     * @param {number} keyCode - The key code of the pressed key.
     * @param {boolean} isPressed - Indicates whether the key is pressed or released.
     */
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

/**
 * Enters fullscreen mode.
 */
function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    document.getElementById('canvas').classList.add('fullscreen');
    document.getElementById('activateFs').classList.add('hide');
    document.getElementById('disableFs').innerHTML = /*HTML*/ `<button id='endFs' class="btn" onclick='exitFullscreen(),resetAll()'><div class="disable-fs"></div></button>`;
    enterFullscreen(fullscreen);
}

/**
 * Requests fullscreen mode for the specified element.
 * @param {HTMLElement} element - The element to enter fullscreen mode.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

/**
 * Resets all fullscreen-related elements and settings.
 */
function resetAll() {
    let canvasHtml = document.getElementById('canvas');
    document.getElementById('endFs').style.display = 'none';
    document.getElementById('activateFs').classList.remove('hide');
    canvasHtml.classList.remove('fullscreen');
}

/**
 * Toggles the audio on/off for the specified element.
 * @param {string} id - The ID of the element.
 */
function audioOnOff(id) {
    document.getElementById(id).classList.toggle('audio-off');
}

/**
 * Opens the story modal.
 */
function openModal() {
    var modal = document.getElementById('storyModal');
    modal.classList.remove('hide');
}

/**
 * Closes the story modal.
 */
function closeModal() {
    var modal = document.getElementById('storyModal');
    modal.classList.add('hide');
}

/**
 * Toggles the visibility of the controls.
 */
function showControls() {
    document.getElementById('showControls').classList.toggle('hide');
}

/**
 * Mutes all game sounds.
 */
function muteAll() {
    loseSound.muted = true;
    winSound.muted = true;
}

/**
 * Unmutes all game sounds.
 */
function unmuteAll() {
    loseSound.muted = false;
    winSound.muted = false;
}

/**
 * Checks the audio settings and mutes/unmutes the game sounds accordingly.
 */
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

/**
 * Checks if the game is lost and performs the necessary actions.
 */
function gameLost() {
    setTimeout(function () {
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

/**
 * Checks if the game is won and performs the necessary actions.
 */
function gameWon() {
    setTimeout(function () {
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

/**
 * Restarts the game by reloading the page.
 */
function restart() {
    window.location.reload();
}

/**
 * Stops all game-related activities and sounds.
 */
function killGame() {
    for (let i = 0; i < 9999; i++) {
        clearInterval(i);
    }
    bgMusic.pause();
    world.character.muteCharSounds();
    bgChickenSounds.pause();
    boss_stage_sound.pause();
    world.muteItemSounds();
}