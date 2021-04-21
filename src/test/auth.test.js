const auth = require('../controllers/authController')

describe('authentication', ()=>{
    it('nose', ()=>{
        console.log(auth.authenticateUser);
        expect(auth.authenticateUser).toBe(true)
    })
})
