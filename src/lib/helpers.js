const bcrypt = require('bcryptjs')
const helper = {}

helper.encryptPassword = async (password)=>{
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        return hash
    } catch (e) {
        console.log(e.message);
    }
}

helper.verifyPassword = async (password, storedPassword)=>{
    try {
        return await bcrypt.compare(password, storedPassword)
    } catch (e) {
        console.log(e.message);
    }
}

module.exports = helper
