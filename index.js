const express = require('express');
const app = express();

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

require('dotenv').config();
const port = process.env.PORT;

const database = require('./config/database');
database.connect();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const clientRoutes = require('./routes/client/index.route');
const adminRoutes = require('./routes/admin/index.route');

const systemConfig = require('./config/systemConfig');
app.locals.prefixAdmin = systemConfig.prefixAdmin;

const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session')
app.use(cookieParser('keyboard cat'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));
app.use(flash());

const path = require('path');
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

const moment = require('moment');
app.locals.moment = moment;

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

app.use(express.static(`${__dirname}/public`));

clientRoutes(app);
adminRoutes(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})