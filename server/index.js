const express = require("express");
const cors = require("cors")
const http = require('http');
const socketSetup = require('./routes/socket');

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
const commentsRoutes = require('./routes/Comments')
app.use("/posts", postsRouter)
app.use("/tags", tagsRouter)
app.use("/users", usersRouter)
app.use('/auth', authRoutes);
app.use('/likes', likeRoutes);
app.use('/raitings', raitingsRoutes);
app.use('/comments', commentsRoutes);

const server = http.createServer(app)

socketSetup(server);

db.sequelize.sync().then(() => {
    server.listen(process.env.PORT || 3001, () => {
        console.log("Server is running")
    })    
}).catch((err) => {
    console.error(err)
})
