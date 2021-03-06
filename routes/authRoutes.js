const passport = require('passport');
module.exports = (app)=>{

    // app.get('/auth/google/callback',
    //         passport.authenticate('google',{ successRedirect: '/',
    //         failureRedirect: '/',
    //         failureFlash: true }),
    // );

    app.get('/auth/google/callback', 
    passport.authenticate('google'),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/surveys');
    });

    app.get('/auth/google/get',
        passport.authenticate( 'google',{
            scope : ['profile','email']
    }),function(){
    console.log('get Sucess');  
    });

    app.get('/api/logout',(req,res)=>{
        req.logout();
        res.send("you are logged out")
    });
    
    app.get('/api/current_user',(req,res)=>{
        console.log(req.user);
        res.send(req.user);
    });
};


