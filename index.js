const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passportJWT = require('./config/passport-jwt-strategy');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'

        },
        function (err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(express.urlencoded({  extended: true}));
app.use(flash());
app.use(customMware.setFlash);
// use express router
app.use('/', require('./routes'));


app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
