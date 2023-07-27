const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(9000, () => {
    console.log('Server is running on http://localhost:9000');
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/图片.html');
});