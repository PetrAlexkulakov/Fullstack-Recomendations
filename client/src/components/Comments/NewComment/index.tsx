import { FormEvent, useState } from "react";
// import axios from "axios";
import { Post } from "../../../interfaces/Post";
import { Socket } from "socket.io-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NewComment = ({ post, socket }: { post: Post, socket: Socket<any, any> }) => {
  const [text, setText] = useState("");
  const token = localStorage.getItem('token');
//   const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if(text) {
        // Отправляем новый комментарий на сервер
        socket.emit('sendComment', { postId: post.id, comment: text, token });
        // axios.post(`${baseURL}/comments/comments/${post.id}`,{
        //     text: text
        // }, {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        // }).then(() => {
        //     setText("")
        // })
    }
  }

  return (
    <form className="mb-4 d-flex" onSubmit={(e) => handleSubmit(e)}>
        <textarea 
          className="form-control" 
          rows={3} 
          placeholder="Join the discussion and leave a comment!"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="border border-black ms-1 me-1">Send</button>
    </form>
  )
}

export default NewComment
