import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../../interfaces/Post";
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import { dataToString } from "../../shared/dataToString";
import PageWrapper from "../../components/PageWrapper";
import Likes from "../../components/Likes";
import Ratings from "../../components/Raitings";
import Comments from "../../components/Comments";
import { useTranslation } from "react-i18next";

const Post = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL

  useEffect(() => {
    const fetchPost = async () => {
      const res = await (await axios.get(baseURL + '/posts/' + id)).data

      setPost(res);
    };
    fetchPost();
  }, [baseURL, id])

  return (
    <PageWrapper>
        <div className="col-lg-8">
            {post && 
            <>
                <article>
                    <header className="mb-4 d-flex flex-column align-items-center">
                        <h3 className="fw-bolder mb-1">{post.title}</h3>
                        <div className="d-flex justify-content-around gap-3 w-100">
                            <Ratings post={post} />
                            <div className="badge bg-secondary text-decoration-none link-light">{t(post.group)}</div>
                            <div className="text-muted fst-italic mb-2">{dataToString(post.createdAt)}</div>
                        </div>
                    </header>
                    <figure className="mb-4"><img className="img-fluid rounded" src={post.imageURL} alt="..." /></figure>
                    <section className="mb-5" style={{textAlign: "left"}}>
                        {post.fullText.split('\n').map((paragraph, index) => (
                            <ReactMarkdown 
                                key={index} 
                                className="fs-5 mb-4"
                                children={paragraph} 
                            />
                        ))}
                    </section>
                    <div className="d-flex justify-content-around align-items-center gap-3 mb-3">
                        <Ratings post={post} canChange={true} />
                        <div className="d-flex justify-content-around"><Likes post={post} /></div>
                    </div>
                </article> 
                <section className="mb-5">
                    <Comments post={post} />
                </section>
            </>
            }
        </div>
    </PageWrapper>
  )
}

export default Post
