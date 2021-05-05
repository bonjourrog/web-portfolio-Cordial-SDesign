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
    res.render('auth/signIn')
}

controller.logout = (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/auth/signin')
        console.log(req.session);
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
        projects.length > 0 ? res.render('auth/adminPanel', {projects}) : res.render('auth/adminPanel', {projects:0})
    }catch(e){
        console.log(e.message)
    }
}

controller.updateScreen = async (req, res)=>{
    try{
        const {id} = req.params
        const user = await pool.query('SELECT * FROM portfolio WHERE id = ?', [id])
        res.render('auth/updateDesign', {user})
    }catch(e){
        console.log(e.message);
    }
}

controller.uploadDesign = async (req, res)=>{
    try {
        // const image  =  path.join('/uploads', req.file.filename)
        const image  = req.file.filename
        const {desc} = req.body
        await pool.query('INSERT INTO portfolio(id, image, description) VALUES(id, ?, ?)', [image, desc])
        req.flash('message', 'Diseño agregado correctamente.')
        res.redirect('/auth/adminpanel')
    } catch (e) {
        console.log('Error al intentar registrar una imagen => ',e.message)
        req.flash('message', 'Asegurese de seleccionar una imagen valida [jpeg|jpg|png|svg|gif]')
        res.redirect('/auth/adminpanel')
    }
}

controller.portfolio = async (req, res)=>{
    try{
        const projects = await pool.query('SELECT * FROM portfolio')
        projects.length > 0 ? res.render('auth/adminPortfolio', {projects}) : res.render('auth/adminPortfolio', {projects:0})
    }catch(e){
        console.log(e.message);
    }
}

controller.delete = async (req, res)=>{
    try{
        const {id} = req.params
        const nameProject = await pool.query('SELECT image FROM portfolio WHERE id = ?', [id])
        if(nameProject.length > 0){
            await pool.query('DELETE FROM portfolio WHERE id = ? ', [id])
            fs.unlinkSync(path.join(__dirname, `../public/uploads/${nameProject[0].image}`))
        }
        res.redirect('/auth/portfolio')
    }catch(e){
        console.log(e.message);
    }
}

controller.updateDesign = async (req, res)=>{
    try{
        if(typeof(req.file) === 'undefined'){
            const {id} = req.params
            const {desc} = req.body
            const design = await pool.query('SELECT image FROM portfolio WHERE id = ?',[id])
            if(design.length > 0){
                await pool.query('UPDATE portfolio SET image = ?, description = ? WHERE id = ?', [design[0].image, desc, id])
                res.redirect('/auth/portfolio')
            }
        }else{
            const image = req.file.filename
            const {id} = req.params
            const {desc} = req.body
            const design = await pool.query('SELECT image FROM portfolio WHERE id = ?',[id])
            if(design.length > 0){
                await pool.query('UPDATE portfolio SET image = ?, description = ? WHERE id = ?', [image, desc, id])
                fs.unlinkSync(path.join(__dirname, `../public/uploads/${design[0].image}`))
                res.redirect('/auth/portfolio')
            }
        }


    }catch(e){
        console.log('Eror al tratar de hacer update', e.message)
    }
}

controller.contactScreen = (req, res)=>{
    res.render('auth/contact')
}

module.exports = controller
