/**
 * Represents a status boss bar.
 * @extends DrawableObject
 */
class StatusBossBar extends DrawableObject{

    IMAGES_HEALTH = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];

    percentage = 100;

    /**
     * Creates a new instance of the StatusBarBoss class.
     */
    constructor(){
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.x = -1000;   
        this.y = 10;
        this.width = 200;
        this.height = 50;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage value of the status bar.
     * @param {number} percentage - The percentage value to set.
     */
    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.checkImgIndex()];
        this.img = this.images[path];
    }

    /**
     * Returns the image index based on the percentage value.
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