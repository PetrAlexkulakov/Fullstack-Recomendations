import { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from "axios";
import { Post } from "../../interfaces/Post";
import PageWrapper from "../../components/PageWrapper"
import Cards from "../../components/Cards";
import Card from "../../components/Card";

const Main = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const location = useLocation();
  const quertParams = queryString.parse(location.search)

  useEffect(() => {
    axios.get(baseURL + '/posts', {
        params: {
            group: quertParams.group,
            tags: quertParams.tags,
            search: quertParams.search
        }
    }).then((res) => {
        setPosts(res.data)
    })
  }, [baseURL, quertParams.group, quertParams.search, quertParams.tags])

  return (
    <PageWrapper isMain={true}>
        <div className="col-lg-8">
            <div className="card mb-4">
                {posts.length > 0 && 
                <div>
                    <Card post={posts[0]} />
                </div>
                }
            </div>
            <div className="row">
                <Cards posts={posts.slice(1)} />
            </div>
        </div>
    </PageWrapper>
  )
}

export default Main
