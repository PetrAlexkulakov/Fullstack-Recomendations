import { Post } from "../../interfaces/Post";
import { dataToString } from "../../shared/dataToString";
import axios from "axios";
import Likes from "../Likes";
import Ratings from "../Raitings";
import { useTranslation } from "react-i18next";

const Card = ({ post, isAuthor = false }: { post: Post, isAuthor?: boolean }) => {
  const { t } = useTranslation();
  const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const deletePost = (e: MouseEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.delete(baseURL + "/posts/" + post.id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      window.location.reload();
    })
  }
  return (
    <>
      <div className="card-body d-flex flex-column justify-content-end align-items-center">
        <img className="w-100 pb-2" src={post.imageURL} alt="..." />
        <div className="d-flex gap-3"> 
          <Ratings post={post} />
          <div className="badge bg-secondary text-decoration-none link-light">{post.group}</div>
          <div className="small text-muted">{dataToString(post.createdAt)}</div>
        </div>
        <h2 className="card-title h4" style={{textAlign: "left"}}>{post.title}</h2>
        <p className="card-text" style={{textAlign: "left"}}>{post.smallText}</p>
        <div className="d-flex justify-content-around align-items-center w-100">
          {isAuthor && <button className="btn btn-primary" onClick={(e) => deletePost(e as unknown as MouseEvent)}>
              {t('Delete')}
            </button>
          }
          <a className="btn btn-primary" href={`/post/${post.id}`}>{t('ReadMore')}</a>
          {isAuthor && <a className="btn btn-primary" href={`/editPost/${post.id}`}>{t('Edit')}</a>}
          <Likes post={post} />
        </div>
      </div>
    </>
  )
}

export default Card
