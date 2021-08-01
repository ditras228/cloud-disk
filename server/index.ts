require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authRouter=require('./routers/auth.routes.ts')
const fileRouter=require('./routers/file.routes.ts')
const corsMiddleware = require('./middleware/cors.middleware.ts')
const fileUpload = require('express-fileupload')
const filePathMiddleware = require('./middleware/filepath.middleware.ts')
const staticPathMiddleware = require('./middleware/staticPath.middleware.ts')
const path = require('path')
const app=express()
const PORT = process.env.PORT || 5001


app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(filePathMiddleware(path.resolve(__dirname, 'files')))
app.use(staticPathMiddleware(path.resolve(__dirname, 'static')))
//app.use(express.static(path.join(process.env.PWD,'static' )))
app.use(express.static('static' ))
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
