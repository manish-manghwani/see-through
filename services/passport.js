const passport  = require('passport');
const GoogleStategy  = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null,user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id).then(user =>{
        done(null, user);
    });
});

passport.use(
    new GoogleStategy({
        clientID : keys.googleClientID,
        clientSecret : keys.googleClientSecret,
        callbackURL : 'http://localhost:5000/auth/google/callback',
    },(accessToken , refreshToken , profile, cb) => {
        
        User.findOne({googleID : profile.id}).then(existingUser => {
            if(existingUser){
                done(null,existingUser);
                console.log(googleID);
            }else{
                new User({googleID : profile.id}).save()
                .then(user => done(null,user));
            }
        })
    })
);

