import { useEffect, useState } from "react"
import axios from "axios";
import { Post } from "../../interfaces/Post";
import PageWrapper from "../../components/PageWrapper"
import Cards from "../../components/Cards";
import Card from "../../components/Card";

const Main = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL

  useEffect(() => {
    axios.get(baseURL + '/posts').then((res) => {
        setPosts(res.data)
    })
  }, [baseURL])

  return (
    <PageWrapper>
        <div className="col-lg-8">
            <div className="card mb-4">
                {posts.length > 0 && 
                <div>
                    <Card post={posts[0]} />
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
