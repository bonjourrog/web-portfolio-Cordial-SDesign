const express = require('express')
const multer = require('multer')
const path = require('path')
const morgan = require('morgan')
const cookie = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const MysqlStore = require('express-mysql-session')
const {v4:uuidv4} = require('uuid')
const app = express()

const passport = require('./lib/passport')
const router = require('./routes/userRoutes')
const authRouter = require('./routes/authRoutes')
const  {database} = require('./config/keys')



app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb)=>{
        cb(null, uuidv4() + path.extname(file.originalname).toLowerCase())
    }
})

const upload = multer({
    storage,
    dest: path.join(__dirname, 'public/uploads'),
    limit: {fileSize: 2000000},
    fileFilter: (req, file, cb)=>{
        const filetypes = /jpeg|jpg|png|svg|gif/
        const mimetype = filetypes.test(file.mimetype)
        const extname = filetypes.test(path.extname(file.originalname))

        if(mimetype && extname){
            return cb(null, true)
        }
        cb('Error: el archivo debe ser una imagen valida')
    }
}).single('image')
app.use(upload)

app.use(flash())
app.use(cookie())
app.use(session({
    secret:'My secret',
    resave:false,
    saveUninitialize:false,
    store: new MysqlStore(database)
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))

//Note: Local variables
app.use((req, res, next)=>{
    res.locals.message = req.flash('message')
    console.log(req.flash('message'));
    next()
})

app.use('/auth', authRouter)
app.use('/', router)



app.listen(app.get('port'), ()=>{
    console.log(`Listening on port ${app.get('port')}`);
})
