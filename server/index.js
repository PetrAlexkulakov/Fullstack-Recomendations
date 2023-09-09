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
const tagsRouter = require('./routes/Tags')
const usersRouter = require('./routes/Users')
const authRoutes = require('./routes/auth');
const likeRoutes = require('./routes/Likes')
const raitingsRoutes = require('./routes/Raitings');
app.use("/posts", postsRouter)
app.use("/tags", tagsRouter)
app.use("/users", usersRouter)
app.use('/auth', authRoutes);
app.use('/likes', likeRoutes);
app.use('/raitings', raitingsRoutes);

db.sequelize.sync().then(() => {
    app.listen(process.env.PORT || 3001, () => {
        console.log("Server is running")
    })    
}).catch((err) => {
    console.error(err)
})
