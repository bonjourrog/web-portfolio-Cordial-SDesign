const passport = require('passport')
const helpers = require('../lib/helpers')
const pool = require('../config/database')
const path = require('path')
const fs = require('fs')
const controller = {}

controller.authenticateUser = passport.authenticate('local', {
    successRedirect: '/auth/adminpanel',
    failureRedirect: '/auth/signin',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
})

// NOTE: Verify if user is already logged
controller.userAuthenticated = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    return res.redirect('/auth/signin')
}

controller.userNotAuthenticated = (req, res, next)=>{
    !req.isAuthenticated() ? next() : res.redirect('/auth/adminpanel') 
}

controller.signIn = (req, res)=>{
    res.render('signIn')
}

controller.logout = (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/auth/signin')
    })
}

controller.register = (req, res)=>{
    res.render('register')
}

controller.signUp = async (req, res)=>{
    try {
        const {userName, password} = req.body
        const pass = await helpers.encryptPassword(password.trim())
        const user = await pool.query('INSERT INTO users (id, userName, password) VALUES(id, ?, ?) ', [userName.trim().toLowerCase(), pass])
        res.redirect('/auth/signin')
    } catch (e) {
        console.log(e.message);
    }


}

controller.adminPanel = async (req, res)=>{
    try{
        const projects = await pool.query('SELECT * FROM portfolio ORDER BY id DESC;')
        projects.length > 0 ? res.render('adminPanel', {projects}) : res.render('adminPanel', {projects:0})
    }catch(e){
        console.log(e.message)
    }
}

controller.uploadDesign = async (req, res)=>{
    try {
        const image  =  path.join('/uploads', req.file.filename)
        const {desc} = req.body
        await pool.query('INSERT INTO portfolio(id, imgurl, description) VALUES(id, ?, ?)', [image, desc])
        req.flash('message', 'Diseño agregado correctamente.')
        console.log(res.message);
        res.redirect('/auth/adminpanel')
    } catch (e) {
        console.log(e.message)
    }
}

controller.portfolio = async (req, res)=>{
    try{
        const projects = await pool.query('SELECT * FROM portfolio')
        projects.length > 0 ? res.render('adminPortfolio', {projects}) : res.render('adminPortfolio', {projects:0})
    }catch(e){
        console.log(e.message);
    }
}

controller.delete = async (req, res)=>{
    try{
        const {id} = req.params
        const nameProject = await pool.query('SELECT imgurl FROM portfolio WHERE id = ?', [id])
        if(nameProject.length > 0){
            console.log('este es el idw ', id);
            await pool.query('DELETE FROM portfolio WHERE id = ? ', [id])
            fs.unlinkSync(path.join(__dirname, `../public/${nameProject[0].imgurl}`)
            )
        }
        res.redirect('/auth/portfolio')
    }catch(e){
        console.log(e.message);
    }    
}

module.exports = controller
