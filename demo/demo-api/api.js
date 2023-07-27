const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
init()
draw()
function init() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
}

function draw() {
    const context = ctx

    context.font = 'bold 24px Arial';
    context.fillStyle = 'blue';
    context.textAlign = 'center';
    context.fillText('Hello, Canvas', canvas.width / 2, canvas.height / 2);
    // drawLine()
    // drawRectByLine()
    // drawRectByRect()
    // drawArc()
    // drawText()
}

function drawLine() {
    ctx.lineWidth = 5
    ctx.beginPath();
    ctx.moveTo(500, 100); // 起始点
    ctx.lineTo(780, 200); // 直线
    ctx.closePath(); // 封闭路径
    ctx.strokeStyle = 'white'; // 描边颜色
    ctx.stroke(); // 描边路径
}

// 通过线段绘制矩形
function drawRectByLine() {
    ctx.beginPath();
    ctx.moveTo(100, 100); // 起始点
    ctx.lineTo(200, 100); // 直线
    ctx.lineTo(150, 200); // 直线
    ctx.closePath(); // 封闭路径
    ctx.fillStyle = 'green'; // 填充颜色
    ctx.fill(); // 填充路径
    ctx.strokeStyle = 'black'; // 描边颜色
    ctx.lineWidth = 3; // 描边宽度
    ctx.stroke(); // 描边路径
}

// 通过 fillRect api 绘制矩形
function drawRectByRect() {
    ctx.fillStyle = 'red'; // 填充颜色
    ctx.fillRect(50, 50, 200, 100); // 填充矩形
    ctx.strokeStyle = 'blue'; // 描边颜色
    ctx.lineWidth = 5; // 描边宽度
    ctx.strokeRect(50, 50, 200, 100); // 描边矩形
}

// 绘制圆形
function drawArc() {
    ctx.beginPath();
    ctx.translate(1000, 100)
    ctx.arc(300, 300, 50, 0, Math.PI * 2); // 圆心坐标 (300, 300)，半径为 50
    ctx.fillStyle = 'yellow'; // 填充颜色
    ctx.fill(); // 填充圆形
}

// 绘制文字
function drawText() {
    ctx.font = '24px Arial'; // 文字样式
    ctx.fillStyle = 'purple'; // 文字颜色
    ctx.fillText('Hello, World!', 400, 400); // 绘制填充文本
    ctx.strokeStyle = 'white'; // 描边颜色
    ctx.lineWidth = 2; // 描边宽度
    ctx.strokeText('Hello, World!', 400, 400); // 绘制描边文本
}