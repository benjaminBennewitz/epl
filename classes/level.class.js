/**
 * Represents a level in the game.
 * @class
 */
class Level{
    boss;
    enemies;
    coins;
    bottles;
    clouds;
    backgroundObjects;
    level_end_x = 2200;

    constructor(boss, enemies, coins, bottles, clouds, backgroundObjects){
        this.boss = boss;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}