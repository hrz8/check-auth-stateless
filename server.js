require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');

const { User, Game } = require('./database/models');

const app = express();
app.use(express.json());

const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

const authenticationMiddleware = function(req, res, next) {
    const token = req.header('Authorization');

    let decoded = null;

    try {
        decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        res.status(400);
        res.json({
            error: 'token invalid'
        });

        return;
    }

    next();
}

app.post('/login', async function(req, res) {
    const aud = req.header('x-audience');

    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({
        where: {
            username,
        },
    });

    if (!user) {
        res.status(400);
        res.json({
            error: 'invalid login',
        });

        return;
    }

    if (user.password !== password) {
        res.status(400);
        res.json({
            error: 'invalid login',
        });

        return;
    }

    const token = jwt.sign({
        sub: String(user.id),
        iss: 'game-app-binar',
        aud: aud || 'dashboard',
    }, JWT_SECRET, {
        expiresIn: '1m',
    });

    res.json({
        token
    });
});

app.get('/games', authenticationMiddleware, async function(req, res) {
    const games = await Game.findAll();

    res.json({
        data: games,
    });
});

app.listen(PORT, function() {
    console.info('server running at port:', PORT);
});
