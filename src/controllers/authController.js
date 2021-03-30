const controller = {}

controller.signIn = (req, res)=>{
    res.render('signIn')
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
