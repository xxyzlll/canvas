const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d', {
    willReadFrequently: true
});
init()

function init() {
    canvas.width = 200
    canvas.height = 200

    const image = new Image();
    image.onload = function () {
        ctx.drawImage(image, 0, 0, 200, 200)
    }
    image.src = "./emoji.png";
}

canvas.addEventListener('click', (e) => {
    const x = e.offsetX, y = e.offsetY
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const clickColor = getColor(x, y, imageData.data);
    const changeColor = [249, 113, 1, 246]

    function _changeColor(x, y) {
        if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.width) {
            return
        }
        const color = getColor(x, y, imageData.data)
        if (diff(clickColor, color) > 100 || diff(changeColor, color) === 0) {
            return
        }
        const _i = point2Index(x, y)
        imageData.data.set(changeColor, _i)
        _changeColor(x + 1, y)
        _changeColor(x - 1, y)
        _changeColor(x, y + 1)
        _changeColor(x, y - 1)
    }

    _changeColor(x, y)
    ctx.putImageData(imageData, 0, 0)
})

function point2Index(x, y) {
    return (y * canvas.width + x) * 4
}

function getColor(x, y, data) {
    const i = point2Index(x, y)
    return [data[i], data[i + 1], data[i + 2], data[i + 3]]
}

function diff(color1, color2) {
    const diffR = Math.abs(color1[0] - color2[0]);
    const diffG = Math.abs(color1[1] - color2[1]);
    const diffB = Math.abs(color1[2] - color2[2]);
    const diffA = Math.abs(color1[3] - color2[3]);

    return diffR + diffG + diffB + diffA
}
