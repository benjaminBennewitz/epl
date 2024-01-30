class Level{
    enemies;
    coins;
    clouds;
    backgroundObjects;
    level_end_x = 2200;

    constructor(enemies, coins, clouds, backgroundObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
    }
}