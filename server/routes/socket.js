const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const keys = require('../keys');
const { Comments, Posts } = require('../models');

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected to socket:', socket.id);

    socket.on('subscribeToComments', (postId) => {
      socket.join(postId);
    });

    socket.on('sendComment', async ({ postId, comment, token }) => {
      if (token && token !== 'null') {
        const decodedToken = jwt.verify(token, keys.jwt);
        const { username, userId } = decodedToken;

        const post = await Posts.findByPk(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        await Comments.create({
            text: comment,
            postId,
            userId,
        });

        io.to(postId).emit('newComment', { text: comment, user: {username} });
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected from socket:', socket.id);
    });
  });
};
