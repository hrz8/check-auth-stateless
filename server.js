require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

app.post('/login', function(req, res) {
    const token = jwt.sign({
        foo: 'bar',
    }, JWT_SECRET);

    res.send(token);
});

app.post('/validate-token', function(req, res) {
    const token = req.body.token;

    let decoded = null;

    try {
        decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        res.status(400);
        res.send('token invalid');

        return;
    }

    res.json(decoded);
});

app.listen(PORT, function() {
    console.info('server running at port:', PORT);
});
