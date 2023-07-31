const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
init()

function getRandom(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min)
}

function init() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

class Point {
    r = 6
    constructor() {
        this.x = getRandom(this.r, this.maxBoundaryX)
        this.y = getRandom(this.r, this.maxBoundaryY)

        this.xSpeed = getRandom(-500, 500)
        this.ySpeed = getRandom(-500, 500)

        this.lastDrawTime = null
    }
    get maxBoundaryY() {
        return canvas.height - this.r
    }
    get maxBoundaryX() {
        return canvas.width - this.r
    }
    draw() {
        if (this.lastDrawTime) {
            // 移动
            const duration = (Date.now() - this.lastDrawTime) / 1000
            console.log('duration', duration);
            let xDis = this.x + duration * this.xSpeed
            let yDis = this.y + duration * this.ySpeed

            if (xDis >= this.maxBoundaryX) {
                // 右侧边界
                this.xSpeed = -this.xSpeed
                xDis = this.maxBoundaryX
            }
            if (xDis <= 0) {
                // 右侧边界
                this.xSpeed = -this.xSpeed
                xDis = this.r
            }

            if (yDis >= this.maxBoundaryY) {
                // 右侧边界
                this.ySpeed = -this.ySpeed
                yDis = this.maxBoundaryY
            }
            if (yDis <= 0) {
                // 右侧边界
                this.ySpeed = -this.ySpeed
                yDis = this.r
            }

            this.x = xDis
            this.y = yDis
        }
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = 'white'
        ctx.fill()

        this.lastDrawTime = Date.now()
    }
}

class Graph {
    constructor(pointNumber = 30, maxDistance = 500) {
        this.maxDistance = maxDistance
        this.pointNumber = pointNumber
        this.points = new Array(pointNumber).fill().map(() => new Point())
    }
    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        requestAnimationFrame(() => {
            this.draw()
        })
        for (let i = 0; i < this.pointNumber; i++) {
            const p = this.points[i]
            p.draw()
            for (let j = i + 1; j < this.pointNumber; j++) {
                const p2 = this.points[j]
                const pDis = Math.sqrt(((p2.x - p.x) ** 2) + (p2.y - p.y) ** 2)
                if (pDis > this.maxDistance) {
                    continue;
                }
                const opacity = 1 - pDis / this.maxDistance + 0.2
                ctx.beginPath()
                ctx.moveTo(p.x, p.y)
                ctx.lineTo(p2.x, p2.y)
                ctx.strokeStyle = `rgba(255,255,255,${opacity})`
                ctx.stroke()
            }
        }
    }
}

const graph = new Graph()
graph.draw()