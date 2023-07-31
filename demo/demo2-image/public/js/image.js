const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d', {
    willReadFrequently: true
});
init()

function init() {
    canvas.width = 200
    canvas.height = 200

    const img = new Image()
    img.onload = () => {
        ctx.drawImage(img, 0, 0, 200, 200)
    }
    img.src = './emoji.png'
}

canvas.onclick = (e) => {
    const { offsetX, offsetY } = e
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const changeColor = [249, 113, 1, 246]
    const clickColor = getColor(offsetX, offsetY, imageData.data)

    function diffChange(x, y) {
        if (x <= 0 || x >= canvas.width) return
        if (y <= 0 || y >= canvas.height) return

        const color = getColor(x, y, imageData.data)
        if (diff(clickColor, color) > 100 || diff(changeColor, color) === 0) {
            return
        }

        const changeIndex = point2Index(x, y)
        imageData.data.set(changeColor, changeIndex)

        diffChange(x - 1, y)
        diffChange(x, y - 1)
        diffChange(x + 1, y)
        diffChange(x, y + 1)
    }

    diffChange(offsetX, offsetY)
    ctx.putImageData(imageData, 0, 0)
}

/**
 * 通过坐标转换到 imageData 数组下标值
 * @param {*} x 
 * @param {*} y 
 * @returns 
 */
function point2Index(x, y) {
    return (y * canvas.width + x) * 4
}

/**
 * 通过坐标获取对应的颜色值
 * @param {*} x 
 * @param {*} y 
 * @param {*} data 
 * @returns 
 */
function getColor(x, y, data) {
    const i = point2Index(x, y)
    return [data[i], data[i + 1], data[i + 2], data[i + 3]]
}

/**
 * 比较两个颜色间的差异
 * @param {*} color1 
 * @param {*} color2 
 * @returns 
 */
function diff(color1, color2) {
    const diffR = Math.abs(color1[0] - color2[0]);
    const diffG = Math.abs(color1[1] - color2[1]);
    const diffB = Math.abs(color1[2] - color2[2]);
    const diffA = Math.abs(color1[3] - color2[3]);

    return diffR + diffG + diffB + diffA
}
