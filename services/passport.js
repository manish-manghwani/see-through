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
        callbackURL : '/auth/google/callback',
        proxy : true
    },(accessToken , refreshToken , profile, cb, done) => {

        console.log('accessToken',accessToken);
        console.log('refreshToken',refreshToken);
        console.log('profile',profile);
        console.log('cb',cb);
        
        User.findOne({googleID : profile.id}).then(existingUser => {
            if(existingUser){
                console.log(existingUser);
                console.log('User Exist');
                return done(null,existingUser);
            }else{
                new User({googleID : profile.id}).save()
                .then((user) => {
                    console.log('New User Added');
                    return done(null,user);
                })
            }
        })
    })
);