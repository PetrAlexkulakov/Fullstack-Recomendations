import { useEffect, useState } from "react"
import axios from "axios";
import { Post } from "../../interfaces/Post";
import PageWrapper from "../../components/PageWrapper"

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
                <div className="col-lg-6">
                    {posts.slice(1).map((post, index) => {
                        return(
                            <div key={index} className="card mb-4">
                                <a href="#!"><img className="card-img-top" src={post.imageURL} alt="..." /></a>
                                <div className="card-body">
                                    <div className="small text-muted">{post.createdAt}</div>
                                    <h2 className="card-title h4">{post.title}</h2>
                                    <p className="card-text">{post.smallText}</p>
                                    <a className="btn btn-primary" href="#!">Read more →</a>
                                </div>
                            </div>
                        )})}
                </div>
            </div>
            <nav aria-label="Pagination">
                <hr className="my-0" />
                <ul className="pagination justify-content-center my-4">
                    <li className="page-item disabled"><a className="page-link" href="#" aria-disabled="true">Newer</a></li>
                    <li className="page-item active" aria-current="page"><a className="page-link" href="#!">1</a></li>
                    <li className="page-item"><a className="page-link" href="#!">2</a></li>
                    <li className="page-item"><a className="page-link" href="#!">3</a></li>
                    <li className="page-item disabled"><a className="page-link" href="#!">...</a></li>
                    <li className="page-item"><a className="page-link" href="#!">15</a></li>
                    <li className="page-item"><a className="page-link" href="#!">Older</a></li>
                </ul>
            </nav>
        </div>
    </PageWrapper>
  )
}

export default Main
