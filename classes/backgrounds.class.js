/**
 * Represents a background object.
 * @extends MovingObjects
 */
class Background extends MovingObjects{

    width = 720;
    height = 480;

    /**
     * Constructs a new Backgrounds object.
     * @param {string} imagePath - The path to the image.
     * @param {number} x - The x-coordinate of the background.
     */
    constructor(imagePath,x){
        super().loadImg(imagePath);
        this.y = 480 - this.height;
        this.x = x;
    }
}
