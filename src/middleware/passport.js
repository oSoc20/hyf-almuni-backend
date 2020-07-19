const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');
const path = require('path');
const Alumni = require('../models/alumni')

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');


const options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : PUB_KEY,
    algorithms: ['RS256']
};
// The payload is passed into the verify callback
const strategy = new JwtStrategy(options, (payload, done)=>{
    // the JWT is valid!
    // We will assign the `sub` property on the JWT to the database ID of user
    Alumni.findOne({_id: payload.sub })
        .then((user)=>{
            if(user){
                // the JWT is valid and our user is valid, so we are authorized!
                return done(null, user);
            } else{
                return done(null, false)
            }
        })
        .catch(err=>done(err,null))

})
// // index.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {
    passport.use(strategy)
}