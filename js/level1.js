let level_1;
let bossStageHandled = false;

bgMusic = new Audio('audio/level1_theme.mp3');
bgChickenSounds = new Audio('audio/chicken_sounds.mp3');
boss_stage_sound = new Audio('audio/boss_stage.mp3');

function initLevel(){
    setInterval(checkAudio, 1000);
    
    level_1 = new Level([
        new Endboss(),
    ],
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new MiniChicken(),
        new MiniChicken(),
        new MiniChicken(),
        new MiniChicken()
    ],
    [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin()
    ],
    [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle()
    ],
    [
        new Cloud('img/5_background/layers/4_clouds/1.png'),
        new Cloud('img/5_background/layers/4_clouds/2.png'),
        new Cloud('img/5_background/layers/4_clouds/1.png'),
        new Cloud('img/5_background/layers/4_clouds/2.png'),
        new Cloud('img/5_background/layers/4_clouds/1.png'),
        new Cloud('img/5_background/layers/4_clouds/2.png'),
        new Cloud('img/5_background/layers/4_clouds/1.png'),
        new Cloud('img/5_background/layers/4_clouds/2.png'),
        new Cloud('img/5_background/layers/4_clouds/1.png'),
        new Cloud('img/5_background/layers/4_clouds/2.png'),
        new Cloud('img/5_background/layers/4_clouds/1.png'),
        new Cloud('img/5_background/layers/4_clouds/2.png')
    ],
    [
        new Background('img/5_background/layers/air.png', -719),
        new Background('img/5_background/layers/air.png', 0),
        new Background('img/5_background/layers/air.png', 719),
        new Background('img/5_background/layers/air.png', 719*2),
        new Background('img/5_background/layers/air.png', 719*3),

        new Background('img/5_background/layers/3_third_layer/2.png', -719),
        new Background('img/5_background/layers/3_third_layer/1.png', 0),
        new Background('img/5_background/layers/3_third_layer/2.png', 719),
        new Background('img/5_background/layers/3_third_layer/1.png', 719),
        new Background('img/5_background/layers/3_third_layer/2.png', 719*2),
        new Background('img/5_background/layers/3_third_layer/1.png', 719*2),
        new Background('img/5_background/layers/3_third_layer/2.png', 719*3),

        new Background('img/5_background/layers/2_second_layer/2.png', -719),
        new Background('img/5_background/layers/2_second_layer/1.png', 0),
        new Background('img/5_background/layers/2_second_layer/2.png', 719),
        new Background('img/5_background/layers/2_second_layer/1.png', 719),
        new Background('img/5_background/layers/2_second_layer/2.png', 719*2),
        new Background('img/5_background/layers/2_second_layer/1.png', 719*2),
        new Background('img/5_background/layers/2_second_layer/2.png', 719*3),

        new Background('img/5_background/layers/1_first_layer/2.png', -719),
        new Background('img/5_background/layers/1_first_layer/1.png', 0),
        new Background('img/5_background/layers/1_first_layer/2.png', 719),
        new Background('img/5_background/layers/1_first_layer/1.png', 719*2),
        new Background('img/5_background/layers/1_first_layer/2.png', 719*3)
    ]);

    function playBgMusic(){
        bgMusic.play();
        bgMusic.volume = 0.2;
        bgMusic.loop = true;
    }
    
    function playBgSounds(){
        bgChickenSounds.play();
        bgChickenSounds.loop = true;
    }

    function playBossStage(){
        boss_stage_sound.play();
        boss_stage_sound.volume = 0.1;
    }
    
    function muteAll(){
        bgMusic.muted = true;
        bgChickenSounds.muted = true;
        boss_stage_sound.muted = true;
    }
    
    function unmuteAll(){
        bgMusic.muted = false;
        bgChickenSounds.muted = false;
    }

    function checkAudio() {
        const audioIconSwitch = document.getElementById('audioIconSwitch');
    
        switch (true) {
            case (audioIconSwitch && audioIconSwitch.classList.contains('audio-off')):
                muteAll();
                break;
    
            case (world.character.x > 1500 && !bossStageHandled && audioIconSwitch.classList.contains('audio-on')):
                handleBossStage();
                return;
    
            case (audioIconSwitch && audioIconSwitch.classList.contains('audio-on')):
                if (!bossStageHandled) {
                    unmuteAll();
                    playBgMusic();
                    playBgSounds();
                }
                break;
    
            default:
                break;
        }
    }
    
    function handleBossStage() {
        playBossStage();
        bgMusic.muted = true;
        bgChickenSounds.muted = true;
        bossStageHandled = true;
    }
    
}