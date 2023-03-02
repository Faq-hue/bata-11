const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const metthodOverride = require('method-override')
const session = require('express-session')

//init
const app = express()

//settings
app.set('port',process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'), 'layouts'),
    partialsDir:path.join(app.get('views'), 'partials'),
    extname:'.hbs'
}))

app.set('view engine', '.hbs')

//middlewares
app.use(express.urlencoded({extended: false}))
app.use(metthodOverride('_method'))
app.use(session({
    secret: 'appBata',
    resave: true,
    saveUninitialized: true
}))

//global variables

//routes
app.use(require('./routes/index'))
app.use(require('./routes/calendar'))
app.use(require('./routes/merch'))
app.use(require('./routes/users'))

//static files

//server listen
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'))
})