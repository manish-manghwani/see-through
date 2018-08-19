const passport = require('passport');
module.exports = (app)=>{

    app.get('/auth/google/callback',
            passport.authenticate('google',{ successRedirect: '/',
            failureRedirect: '/',
            failureFlash: true }),
    );

    app.get('/auth/google/get',
            passport.authenticate( 'google',{
                scope : ['profile','email']
        })
    );

    app.get('/api/current_user',(req,res)=>{
        console.log(req.user);
        res.send(req.user);
    });
};


