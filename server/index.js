const express = require("express");
const cors = require("cors")
const path = require('path')

const {Storage} = require('@google-cloud/storage')
const gc = new Storage({
    keyFilename: path.join(__dirname, "./sinuous-studio-376508-4fbe736302a0.json"),
    projectId: 'sinuous-studio-376508'
})
const myBucket = gc.bucket('mybudget')

const app = express();
require("dotenv").config()

app.use(express.json())
app.use(cors())

const db = require('./models')

const postsRouter = require('./routes/Posts')
app.use("/posts", postsRouter)

db.sequelize.sync().then(() => {
    app.listen(process.env.PORT || 3001, () => {
        console.log("Server running on port 3001")
    })    
}).catch((err) => {
    console.error(err)
})
