const pool = require('../config/database')
const controller = {}

controller.index = (req, res)=>{
    res.render('index')
}

controller.portfolio = async (req, res)=>{
    try {
        const projects = await pool.query('SELECT * FROM portfolio')
        if(projects.length > 0){
            res.render('user/portfolio', {projects})
        }else{
            console.log('Sin proyectos')
            res.render('user/portfolio', {projects:0})
        }
    } catch (e) {
        console.log(e.message);
    }

}

controller.contact = async (req, res)=>{
    try {
        links = await pool.query('SELECT * from contacts')
        if(links.length > 0){
            res.render('user/contact',{links})
        }else{
            req.flash('No se encontraron enlaces')
            res.redirect('/contact')
        }
    } catch (e) {
            console.log('Algo salio mal '+ e.message);
    }
}

controller.about = (req, res)=>{
    res.render('user/aboutUs')
}

module.exports = controller
