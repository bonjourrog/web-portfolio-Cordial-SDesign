const express = require('express')
const path = require('path')
const morgan = require('morgan')
const app = express()

const router = require('./routes/userRoutes')
const authRouter = require('./routes/authRoutes')

app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/auth', authRouter)
app.use('/', router)


app.listen(app.get('port'), ()=>{
    console.log(`Listening on port ${app.get('port')}`);
})
