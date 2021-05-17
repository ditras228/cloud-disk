require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authRouter=require('./routers/auth.routes')
const fileRouter=require('./routers/file.routes')
const corsMiddleware = require('./middleware/cors.middleware')
const fileUpload = require('express-fileupload')
const filePathMiddleware = require('./middleware/filepath.middleware')
const path = require('path')
const app=express()
const PORT = process.env.PORT || 5000

app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(filePathMiddleware(path.resolve(__dirname, 'files')))
app.use(express.static('static')    )
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/files', fileRouter)

const start = async () => {
    try{
        console.log(process.env.DBURL)

        await mongoose.connect('mongodb+srv://admin:admin@cluster0.enfsr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        app.listen(PORT, ()=> console.log(`Server started on PORT ${PORT}`))
    }catch (e){
        console.log(e)
    }
}
 start()
