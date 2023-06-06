const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

const { User } = require('../database/models');

passport.use(
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
    },
    async function(username, password, done) {
        const user = await User.findOne({
            where: {
                username,
            },
        });

        if (!user) {
            return done('invalid login', null);
        }

        const encryptedPassword = user.password;
        const isPasswordValid = bcrypt.compareSync(password, encryptedPassword);

        if (!isPasswordValid) {
            return done('invalid login', null);
        }

        return done(null, user);
    }),
);

passport.serializeUser(function(user, done) {
    return done(null, user.id);
});

passport.deserializeUser(async function(userId, done) {
    return done(null, await User.findOne({
        where: {
            id: userId,
        },
    }));
});

module.exports = passport;
