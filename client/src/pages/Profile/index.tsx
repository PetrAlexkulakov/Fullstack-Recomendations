import { useEffect, useState } from "react";
import Cards from "../../components/Cards"
import PageWrapper from "../../components/PageWrapper"
import Post from "../Post";
import { useLocation, useParams } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import classes from './styles.module.scss'
import { checkIsAdmin } from "../../shared/authentification/isAdmin";
import { addId } from "../../shared/addId";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const [username, setUsername] = useState('User')
  const [posts, setPosts] = useState<Post[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const { t } = useTranslation();
  const { id } = useParams();
  const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const location = useLocation();
  const quertParams = queryString.parse(location.search)

  useEffect(() => {
    const token = localStorage.getItem('token');
    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            group: quertParams.group,
            tags: quertParams.tags,
            search: quertParams.search
        }
    };

    axios.post(baseURL + '/auth/username', null, axiosConfig).then((res) => {
        setUsername(res.data.username)
    }).catch((error) => {
        console.log(error)
    });
    
    axios.get(baseURL + '/users/userposts/' + id, axiosConfig).then((res) => {
        setPosts(res.data)
    })

    async function checkAdminStatus() {
      const isAdminStatus = await checkIsAdmin();
      setIsAdmin(isAdminStatus);
    }

    checkAdminStatus();
  }, [baseURL, id, quertParams.group, quertParams.search, quertParams.tags])
  
  
  return (
    <PageWrapper isFull={true} isProfile={true}>
        <div className="col-lg-8 pt-2">
            <div className="row">
                <h1>{t('Hello')}, {username}!</h1>
            </div>
            <a href={addId("/createPost", id)} className={classes.btnAddPost}>
                <div className={classes.centeredContent}>
                    <div className="btn">{t('CreateP')}</div>
                </div>
                <div className={classes.btnPlus}></div>
            </a>
            {isAdmin &&
                <a href="/admin-panel" className={classes.btnAddPost}>
                    <div className={classes.centeredContent}>
                        <div className="btn">{t('OpenA')}</div>
                    </div>
                    <div className={classes.btnArrow}></div>
                </a>
            }
            <div className="row">
                <Cards posts={posts} isAuthor={true} />
            </div>
        </div>
    </PageWrapper>
  )
}

export default Profile
