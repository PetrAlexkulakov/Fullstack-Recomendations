import { FormEvent, useState } from "react";
import { Post } from "../../../interfaces/Post";
import { Socket } from "socket.io-client";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NewComment = ({ post, socket }: { post: Post, socket: Socket<any, any> }) => {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const token = localStorage.getItem('token');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if(text) {
        socket.emit('sendComment', { postId: post.id, comment: text, token });
        setText("");
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
        <button type="submit" className="border border-black ms-1 me-1">{t('Send')}</button>
    </form>
  )
}

export default NewComment
