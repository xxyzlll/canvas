const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
init()
function init() {
    canvas.width = 600 * devicePixelRatio;
    canvas.height = 400 * devicePixelRatio;
}

const shapes = []

class Rectangle {
    constructor(color, startX, startY) {
        this.color = color
        this.startX = startX
        this.startY = startY

        this.endX = startX
        this.endY = startY
    }
    // 矩形宽度不对，要乘以dpr
    get minX() {
        return Math.min(this.startX, this.endX)
    }
    get maxX() {
        return Math.max(this.startX, this.endX)
    }
    get minY() {
        return Math.min(this.startY, this.endY)
    }
    get maxY() {
        return Math.max(this.startY, this.endY)
    }

    draw() {
        ctx.beginPath()
        ctx.moveTo(this.minX * devicePixelRatio, this.minY * devicePixelRatio)
        ctx.lineTo(this.maxX * devicePixelRatio, this.minY * devicePixelRatio)
        ctx.lineTo(this.maxX * devicePixelRatio, this.maxY * devicePixelRatio)
        ctx.lineTo(this.minX * devicePixelRatio, this.maxY * devicePixelRatio)
        ctx.closePath()
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.lineCap = 'square'
        ctx.strokeStyle = '#fff'
        ctx.lineWidth = 2 * devicePixelRatio
        ctx.stroke()
    }

    isInsideRect(x, y) {
        return x >= this.minX && x <= this.maxX && y <= this.maxY && y >= this.minY
    }
}

function getShape(x, y) {
    for (let i = shapes.length - 1; i >= 0; i--) {
        const shape = shapes[i]
        if (shape.isInsideRect(x, y)) {
            return shape
        }
    }
    return null
}

canvas.onmousedown = (e) => {
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left,
        y = e.clientY - rect.top

    const shape = getShape(x, y)
    if (shape) {
        const { startX, startY, endX, endY } = shape

        window.onmousemove = (e) => {
            const disX = e.clientX - rect.left - x
            const disY = e.clientY - rect.top - y

            shape.startX = startX + disX
            shape.startY = startY + disY

            shape.endX = endX + disX
            shape.endY = endY + disY
        }
    } else {
        const shape = new Rectangle('pink', x, y)
        shapes.push(shape)

        window.onmousemove = (e) => {
            shape.endX = e.clientX - rect.left
            shape.endY = e.clientY - rect.top
        }
    }
}

canvas.onmouseup = () => {
    window.onmousemove = null
}

function draw() {
    requestAnimationFrame(draw)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (const shape of shapes) {
        shape.draw()
    }
}

draw()