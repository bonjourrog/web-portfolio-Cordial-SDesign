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
            console.log('Sin proyectos');
        }
    } catch (e) {
        console.log(e.message);
    }

}

controller.contact = (req, res)=>{
    res.render('user/contact')
}

controller.about = (req, res)=>{
    res.render('user/aboutUs')
}

module.exports = controller
