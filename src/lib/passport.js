const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const helpers = require('./helpers')
const pool = require('../config/database')

passport.use(
    new localStrategy
    (
        {
            usernameField: 'userName',
            passwordField: 'password'
        },
        async (userName, password, done)=>{
            try {
                // NOTE: Verify if user exist;
                const user = await pool.query('SELECT * FROM users WHERE userName = ? ', [userName])
                if(user.length > 0){
                    // NOTE: Verify if passwords match
                    const pass = await helpers.verifyPassword(password, user[0].password)
                    console.log(pass);
                    if(pass){
                        done(null, user)
                    }else{
                        done(null, false, {message:'Contraseña incorrecta'})
                    }
                }else{
                    done(null, false, {
                        message:'Usuario no encontrado'
                    })
                }
            } catch (e) {
                console.log(e.message)
                done(null, false, {
                    message:'Usuario no encontrado'
                })
            }
        }
    )
)


passport.serializeUser((user, cb)=>{
    cb(null, user)
})

passport.deserializeUser((user, cb)=>{
    cb(null, user)
})

module.exports = passport
