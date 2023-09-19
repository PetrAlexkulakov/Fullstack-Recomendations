import { useEffect, useState } from 'react';
import { IUser } from '../../interfaces/User';
import classes from './styles.module.scss';
import axios from 'axios';
import { Post } from '../../interfaces/Post';
import { useTranslation } from 'react-i18next';

const Author = ({ post }: { post: Post }) => {
  const [author, setAuthor] = useState<IUser | null>();
  const { t } = useTranslation();
  const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  useEffect(() => {
    axios.get(baseURL + "/users/" + post.userId).then((res) => {
      setAuthor(res.data)
    })
  }, [baseURL, post.userId])

  return (
    <span className="align-self-end opacity-75 d-flex align-items-center gap-1">
        {t('Author')}: {author?.username}
        <div className={classes.like} />
        {author?.totalLikes}
    </span>
  )
}

export default Author
