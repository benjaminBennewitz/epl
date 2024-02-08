/**
 * Represents a status bar that displays the health percentage.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject{

    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    percentage = 100;

    /**
     * Represents the constructor of the StatusBarHealth class.
     * @constructor
     */
    constructor(){
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 10;   
        this.y = 10;
        this.width = 200;
        this.height = 50;
        this.setPercentage(1000);
    }

    /**
     * Sets the percentage value for the status bar.
     * @param {number} percentage - The percentage value to set.
     */
    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.checkImgIndex()];
        this.img = this.images[path];
    }

    /**
     * Determines the image index based on the percentage value.
     * @returns {number} The image index.
     */
    checkImgIndex(){
        if(this.percentage == 500){
            return 5;
        } else if (this.percentage > 400){
            return 4;
        } else if (this.percentage > 300){
            return 3;
        } else if (this.percentage > 200){
            return 2;
        } else if (this.percentage > 100){
            return 1;
        } else {
            return 0;
        }
    }
}