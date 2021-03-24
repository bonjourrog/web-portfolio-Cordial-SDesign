const mysql = require('mysql')
const {promisify} = require('util')
const {database} = require('./keys.js')

const pool = mysql.createPool(database)

pool.getConnection((err, conn)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log('database connection closed')
        }
        if(err.code === 'ER_COUNT_COUNT_ERROR'){
            console.log('databasehas a lot of connections')
        }
        if(err.code === 'ECONNREFUSED'){
            console.log('connection rejected')
        }
    }

    if(conn)
    conn.release()
    console.log('db connected')
    return
})

pool.query = promisify(pool.query)

module.exports = pool
