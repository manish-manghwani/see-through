const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');


mongoose.connect('')

const app = express(keys.mongoURI);

require('./routes/authRoutes')(app);
// app.use( passport.initialize());
// app.use( passport.session());

app.get('/',(req,res) => {
    res.send({ HI : 'there'});
});

// const PORT = process.env.PORT || 5000 ;
app.listen(5000);