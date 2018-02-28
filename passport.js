const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;

const JWT_SECRET = require('./config/jwt.config').jwtSecret;
const User = require('./model/user.model');

passport.use(new JwtStrategy({

    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('authorization'),
    secretOrKey: JWT_SECRET

}, async (payload, done) => {

    try {

        const user = await User.findById(payload.sub);

        if(!user) {
            
            return done(null, false);

        } else {

            return done(null, user);
        }

    } catch(err) {

        return done(error, false);
    }
}));

passport.use(new LocalStrategy(async (username, password, done) => {

    try {

        const user = await User.findOne({ username });

        if(!user) {
            
            return done(null, false);

        } else {

            let isMatch = await user.isValidPassword(password);

            if(isMatch)
                return done(null, user);
            else
                return done(null, false);
        }

    } catch(err) {

        return done(error, false);
    }
}));