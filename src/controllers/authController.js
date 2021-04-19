const passport = require('passport')
const helpers = require('../lib/helpers')
const pool = require('../config/database')
const controller = {}

controller.authenticateUser = passport.authenticate('local', {
    successRedirect: ('/auth/adminpanel'),
    failureRedirect: ('/auth/signin'),
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
})

// NOTE: Verify if user is already logged
controller.userAuthenticate = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    return res.redirect('/auth/signin')
}

controller.signIn = (req, res)=>{
    res.render('signIn')
}

controller.register = (req, res)=>{
    res.render('register')
}

controller.signUp = async (req, res)=>{
    try {
        const {userName, password} = req.body
        const pass = await helpers.encryptPassword(password.trim())
        const user = await pool.query('INSERT INTO users (id, username, password) VALUES(id, ?, ?) ', [userName.trim().toLowerCase(), pass])
        res.redirect('/auth/signin')
    } catch (e) {
        console.log(e.message);
    }


}

controller.adminPanel = (req, res)=>{
    res.render('adminPanel')
}

controller.uploadDesign = (req, res)=>{
    const {path} = req.file
    console.log(path)
    res.send('mmmmmm')
}

module.exports = controller
