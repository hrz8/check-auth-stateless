require('dotenv').config();

const path = require('path');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const session = require('express-session')

const passport = require('./utils/passport');
const { User, Game } = require('./database/models');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'))

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 60000,
    }
}));
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

const authenticationMiddleware = async function(req, res, next) {
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

    req.user = await User.findOne({
        where: {
            id: decoded.sub,
        },
    });

    next();
}

const authorizationMiddleware = async function(req, res, next) {
    if (req.user.role !== 'ADMIN') {
        res.status(401);
        res.json({
            error: 'your account has no privilege'
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

    const encryptedPassword = user.password;
    const isPasswordValid = bcrypt.compareSync(password, encryptedPassword);

    if (!isPasswordValid) {
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

app.post('/games', authenticationMiddleware, authorizationMiddleware, async function(req, res) {
    const name = req.body.name;
    const description = req.body.description;

    const game = await Game.create({
        name,
        description
    });

    res.json({
        data: game,
    });
});

app.get('/dashboard/login', function(req, res) {
    res.render('login');
});

app.post('/dashboard/login', passport.authenticate('local', {
    successRedirect: '/dashboard/home',
    failureRedirect: '',
}));

app.get('/dashboard/home', function(req, res) {
    if (!req.isAuthenticated()) {
        res.redirect('/dashboard/login');
    }
    res.render('home', {
        username: req.user.username,
        role: req.user.role,
    });
});

app.listen(PORT, function() {
    console.info('server running at port:', PORT);
});
