const passport = require('passport');
module.exports = (app)=>{

    // app.get('/auth/google/callback',
    //         passport.authenticate('google',{ successRedirect: '/',
    //         failureRedirect: '/',
    //         failureFlash: true }),
    // );

    app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/?fail' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

    app.get('/auth/google/get',
        passport.authenticate( 'google',{
            scope : ['profile','email']
    }),function(){
    console.log('get Sucess');  
    });

    app.get('/api/current_user',(req,res)=>{
        res.send(req.user);
    });
};


