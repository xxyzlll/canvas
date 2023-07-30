const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
init()

function init() {
    canvas.width = 600 * devicePixelRatio;
    canvas.height = 400 * devicePixelRatio;
}

// 存放矩形
const shapes = []
class Rectangle {
    constructor(startX, startY, color) {
        this.startX = startX
        this.startY = startY
        this.color = color

        this.endX = startX
        this.endY = startY
    }
    get minX() {
        return Math.min()
    }
    draw() {

    }
}
