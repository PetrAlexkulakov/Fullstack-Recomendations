import { useEffect, useState } from "react"
import axios from "axios";
import { Post } from "../../interfaces/Post";
import PageWrapper from "../../components/PageWrapper"
import Cards from "../../components/Cards";

const Main = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL

  useEffect(() => {
    axios.get(baseURL + '/posts').then((res) => {
        setPosts(res.data)
    })
  })

  return (
    <PageWrapper>
        <div className="col-lg-8">
            <div className="card mb-4">
                {posts.length > 0 && 
                <div>
                    <a href="#!"><img className="card-img-top" src={posts[0].imageURL} alt="Post-IMG" /></a>
                    <div className="card-body">
                        <div className="small text-muted">{posts[0].createdAt}</div>
                        <h2 className="card-title">{posts[0].title}</h2>
                        <p className="card-text">{posts[0].smallText}</p>
                        <a className="btn btn-primary" href="#!">Read more →</a>
                    </div>
                </div>
                }
            </div>
            <div className="row">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <Cards posts={posts} />
                </div>
            </div>
        </div>
    </PageWrapper>
  )
}

export default Main
