const pool = require('../config/database')
describe('authentication', ()=>{
    it('la autenticación debe ser true si user.length es mayor a 0', async()=>{
        const user = await pool.query('SELECT * FROM users WHERE userName = "roge"')
        expect(user.length > 0).toBe(true)
    })
    it('la ')
})
