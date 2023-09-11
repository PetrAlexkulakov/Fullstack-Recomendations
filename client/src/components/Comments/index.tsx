import { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { Post } from '../../interfaces/Post'
import Comment from './Comment';
import NewComment from './NewComment';
import { IComment } from '../../interfaces/Comment';

const Comments = ({ post }: { post: Post }) => {
  const [comments, setComments] = useState<IComment[]>([])
  const token = localStorage.getItem('token');
  const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;  
  const socket = io(baseURL);

  const receiveCommentHandler = (comment: IComment) => {
    setComments((prev) => [...prev, comment])
  }

  useEffect(() => {
    socket.emit('subscribeToComments', post.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    socket.on('newComment', receiveCommentHandler);

    return () => {
        socket.off("newComment", receiveCommentHandler);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    axios.get(`${baseURL}/comments/comments/${post.id}`)
    .then((res) => {
      setComments(res.data);
    })
  }, [baseURL, post.id])
  
  return (
    <div className="card bg-light">
        <div className="card-body pe-0" style={{}}>
            {token &&             
                <NewComment post={post} socket={socket} />
            }
            <div className="d-flex mb-4 flex-column">
                {comments.map((comm, index) => (
                    <Comment key={index} comment={comm} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default Comments
