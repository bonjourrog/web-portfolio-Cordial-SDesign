const {pool} = require('../config/database')
const controller = {}

controller.index = (req, res)=>{
    res.render('index')
}

controller.portfolio = (req, res)=>{
    res.render('portfolio')
}

controller.contact = (req, res)=>{
    res.render('contact')
}

controller.about = (req, res)=>{
    res.render('AboutUs')
}

module.exports = controller
