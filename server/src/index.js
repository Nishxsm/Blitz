import express from 'express'
import cors from 'cors'
import mysql from 'mysql2/promise'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

dotenv.config()

const app=express()
//middleware
app.use(cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials:true,
}))
app.use(express.json())
app.use(cookieParser())


//db connection
let db
try{
    db=await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'blitz_ecommerce'
    })
    console.log('Mysql is connected');
}   catch(error){
        console.log('MySQL connection failed:')
        console.log('Error:', error.message)
        console.log('Code:', error.code)
        console.log('Host:', process.env.DB_HOST || 'localhost')
        console.log('Port:', process.env.DB_PORT || 3306)
        console.log('Database:', process.env.DB_NAME || 'blitz_ecommerce')
    }


//routes
app.get('/api/health', async(req,res)=>{
    let dbStatus='disconnected'
    if(!db){
        dbStatus='database connection not established'
    }
    else{
    try{
        await db.ping()
        dbStatus='connected'
    }catch (error){
        dbStatus='error: '+ error.message
    }
}

    res.json({
        status:'BLITZ server is running',
        database: dbStatus,
        timesamp:new Date().toISOString()
    })
})


const PORT=process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`BLITZ server is running on http://localhost:${PORT}`)
    console.log(`Client should be on ${process.env.CLIENT_ORIGIN} `)
    console.log(`🗄️ Database: MySQL on ${process.env.DB_HOST}:${process.env.DB_PORT}`)
})


// // Test database query
// app.get('/api/test-db', async (req, res) => {
//     try {
//         const [rows] = await db.execute('SELECT 1 + 1 AS result')
//         res.json({ 
//             success: true,
//             message: 'Database query successful!',
//             data: rows[0]
//         })
//     } catch (error) {
//         res.status(500).json({ 
//             success: false,
//             message: 'Database query failed',
//             error: error.message 
//         })
//     }
// })

// // Test products table
// app.get('/api/test-products', async (req, res) => {
//     try {
//         const [rows] = await db.execute('SELECT * FROM products LIMIT 3')
//         res.json({ 
//             success: true,
//             message: 'Products retrieved successfully!',
//             count: rows.length,
//             products: rows
//         })
//     } catch (error) {
//         res.status(500).json({ 
//             success: false,
//             message: 'Products query failed',
//             error: error.message 
//         })
//     }
// })

// // Test users table
// app.get('/api/test-users', async (req, res) => {
//     try {
//         const [rows] = await db.execute('SELECT id, email, name, created_at FROM users')
//         res.json({ 
//             success: true,
//             message: 'Users table accessible!',
//             count: rows.length,
//             users: rows
//         })
//     } catch (error) {
//         res.status(500).json({ 
//             success: false,
//             message: 'Users query failed',
//             error: error.message 
//         })
//     }
// })


