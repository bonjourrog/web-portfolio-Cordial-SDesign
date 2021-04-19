const express = require('express')
const multer = require('multer')
const path = require('path')
const morgan = require('morgan')
const cookie = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const MysqlStore = require('express-mysql-session')
const passport = require('./lib/passport')
const app = express()

const router = require('./routes/userRoutes')
const authRouter = require('./routes/authRoutes')
const  {database} = require('./config/keys')

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
})

app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const upload = multer({
    storage,
    dest: path.join(__dirname, 'public/uploads'),
    limit: {fileSize: 1000000},
    fileFilter: (req, file, cb)=>{
        const filetypes = '/jpeg|jpg|png|svg|gif/'
        const mimetype = filetypes.test(file.mimetype)
        const extname = filetypes.test(file.extname(file.originalname))

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
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/auth', authRouter)
app.use('/', router)

app.listen(app.get('port'), ()=>{
    console.log(`Listening on port ${app.get('port')}`);
})
