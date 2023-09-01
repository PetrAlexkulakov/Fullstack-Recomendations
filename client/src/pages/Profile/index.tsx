import { useEffect, useState } from "react";
import Cards from "../../components/Cards"
import PageWrapper from "../../components/PageWrapper"
import Post from "../Post";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import classes from './styles.module.scss'

const Profile = () => {
  const [username, setUsername] = useState('User')
  const [posts, setPosts] = useState<Post[]>([]);
  const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const location = useLocation();
  const quertParams = queryString.parse(location.search)

  useEffect(() => {
    // Получите токен из localStorage или вашего состояния
    const token = localStorage.getItem('token');

    // Установите конфигурацию для axios запроса с заголовком Authorization
    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    axios.post(baseURL + '/auth/username', null, axiosConfig).then((res) => {
        setUsername(res.data.username)
    }).catch((error) => {
        console.log(error)
    });

    axios.get(baseURL + '/users/userposts', axiosConfig).then((res) => {
        setPosts(res.data)
    })
  }, [baseURL])
  
  
  return (
    <PageWrapper isMain={true}>
        <div className="col-lg-8 pt-2">
            <a href="/createPost" className={classes.btnAddPost}>
                <div className={classes.centeredContent}>
                    <div className="btn">Create Post</div>
                </div>
                <div className={classes.btnPlus}></div>
            </a>
            <div className="row">
                <h1>Hello, {username}!</h1>
            </div>
            <div className="row">
                <Cards posts={posts} />
            </div>
        </div>
    </PageWrapper>
  )
}

export default Profile
