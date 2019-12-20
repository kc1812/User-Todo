import passport from 'passport';
import LocalPassport from 'passport-local';
import JwtPassport from 'passport-jwt';
import jwt from 'jsonwebtoken';
import env from '../utils/envHandler';
import { getUserByUsername, getUser } from "../modules/Users/Handler";

const secretKey = env().secretKey;
const LocalStrategy = LocalPassport.Strategy;
const JwtStrategy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

exports.localPassport = passport.use(new LocalStrategy(
  (username, password, done) => {
    getUserByUsername(username)
      .then(data => {
        const user = data.data;
        return user.validPassword(password);
      })
      .then(data => {
        const user = data.user;
        const valid = data.valid;
        if (!valid) {
          return done({ statusCode: 400, message: 'Invalid Password!' }, false);
        }
        return done(null, user);
      })
      .catch(err => {
        return done(err, false);
      });
  }
));

exports.verifyUserLocal = passport.authenticate('local', { session: false, failWithError: true });



exports.getToken = (payload, expiresIn) => jwt.sign(payload, secretKey, { expiresIn: expiresIn });

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
  (jwt_payload, done) => {
    // console.log("JWT payload: ", jwt_payload);
    getUser(jwt_payload.id)
      .then(data => {
        return done(null, data.message);
      })
      .catch(err => {
        return done(err, false);
      });
  }));

exports.verifyUserJwt = passport.authenticate('jwt', { session: false });
