const passportJWT = require('passport-jwt');
const dotenv = require("dotenv");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

dotenv.config();
const jwtSecretKey = process.env.JWT_SECRET;
const User = require('../models/User');

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: jwtSecretKey,
}

const jwtStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
	User.findOne({id: payload.id}, (err, user) => {
		if (err) {
			return done(err, false);
		}
		if (user) {
			return done(null, user);
		} else {
			return done(null, false);
		}
	});
});

module.exports = jwtStrategy;