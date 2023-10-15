import axios from 'axios'
import { Post } from '../../interfaces/Post'
import classes from './styles.module.scss'
import { useEffect, useState } from 'react'

const Likes = ({ post }: { post: Post }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState<number>(Number(post.likesCount));
  const token = localStorage.getItem('token');
  const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const handleClick = () => {
    if (token) {
      axios.post(`${baseURL}/likes/${post.id}/like`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
      }).then((res) => {
          if (res.data.action === 'add') {
              setLikesCount(likesCount + 1);
              setIsLiked(true);
          } else {
              setLikesCount(likesCount - 1);
              setIsLiked(false);
          }
      });
    }
  }

  useEffect(() => {
    if (token) {
      axios.get(`${baseURL}/likes/${post.id}/liked`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }).then((res) => { 
        setIsLiked(res.data.liked);
    })
    }
  })
  return (
    <button className={`d-flex p-0 align-items-end gap-1 
      ${isLiked ? classes.btnLiked : classes.btnUnLiked}`} 
      onClick={handleClick}>
        <div className={`text-primary-emphasis ${isLiked ? 'text-primary' : ''}`}>{likesCount}</div>
        <div className={`${classes.like} ${isLiked ? classes.liked : ''}`} />
    </button>
  )
}

export default Likes
