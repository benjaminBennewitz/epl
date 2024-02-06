/**
 * Represents a bottle bar object that extends the DrawableObject class.
 * @class
 * @extends DrawableObject
 */
class BottleBar extends DrawableObject {

    IMAGES_BOTTLES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    percentage = 0;

    /**
     * Represents a status bar for bottles.
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = 10;   
        this.y = 100;
        this.width = 200;
        this.height = 50;
        this.setCollectedBottles(0);
    }

    /**
     * Sets the percentage of collected bottles and updates the image accordingly.
     * @param {number} percentage - The percentage of collected bottles.
     */
    setCollectedBottles(percentage){
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLES[this.checkImgIndex()];
        this.img = this.images[path];
    }
    
    /**
     * Determines the image index based on the percentage value.
     * @returns {number} The image index.
     */
    checkImgIndex(){
        if(this.percentage == 100){
            return 5;
        } else if (this.percentage > 80){
            return 4;
        } else if (this.percentage > 60){
            return 3;
        } else if (this.percentage > 40){
            return 2;
        } else if (this.percentage > 20){
            return 1;
        } else {
            return 0;
        }
    }
}