const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
init()

function getRandom(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min)
}

class Point {
    constructor() {
        this.r = 6
        this.x = getRandom(0, canvas.width - this.r / 2)
        this.y = getRandom(0, canvas.height - this.r / 2)

        this.xSpeed = getRandom(-500, 500)
        this.ySpeed = getRandom(-500, 500)
        this.lastDrawTime = null
    }
    draw() {
        if (this.lastDrawTime) {
            const duration = (Date.now() - this.lastDrawTime) / 1000
            let xDis = this.x + this.xSpeed * duration,
                yDis = this.y + this.ySpeed * duration

            if (xDis > canvas.width - this.r / 2) {
                xDis = canvas.width - this.r / 2
                this.xSpeed = -this.xSpeed
            } else if (xDis < 0) {
                xDis = this.r / 2
                this.xSpeed = -this.xSpeed
            }
            if (yDis > canvas.height - this.r / 2) {
                yDis = canvas.height - this.r / 2
                this.ySpeed = -this.ySpeed
            } else if (yDis < 0) {
                yDis = this.r / 2
                this.ySpeed = -this.ySpeed
            }
            this.x = xDis
            this.y = yDis
        }
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
        ctx.fillStyle = 'rgb(200,200,200)'
        ctx.fill()
        this.lastDrawTime = Date.now()
    }
}


class Graph {
    constructor(pointNum = 150, maxDis = 200) {
        this.points = new Array(pointNum).fill(0).map(() => new Point())
        this.maxDis = maxDis
        this.mousePoint = null;
    }
    draw() {
        requestAnimationFrame(() => {
            this.draw()
        })
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (let i = 0; i < this.points.length; i++) {
            const p = this.points[i]
            p.draw()
            for (let j = i + 1; j < this.points.length; j++) {
                const p2 = this.points[j]
                const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2)
                if (d > this.maxDis) {
                    continue
                }
                ctx.beginPath()
                ctx.moveTo(p.x, p.y)
                ctx.lineTo(p2.x, p2.y)
                ctx.closePath()
                ctx.strokeStyle = `rgb(200,200,200,${1 - d / this.maxDis})`
                ctx.stroke()
            }
        }
    }
}

const graph = new Graph()
graph.draw()

function init() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
}
