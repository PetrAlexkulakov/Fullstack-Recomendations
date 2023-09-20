import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Main from './Main';
import Post from './Post';
import Auth from './Auth';
import { checkIsAuthenticated } from '../shared/authentification/isAuthenticated';
import PrivateRoute from '../components/PrivateRoute';
import Register from './Register';
import Profile from './Profile';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import { checkIsAdmin } from '../shared/authentification/isAdmin';
import Admin from './Admin';
import NotFound from './NotFound';

const AppRouter = () => {
  const [isAuthenticated] = useState(checkIsAuthenticated())
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const isAdminStatus = await checkIsAdmin();
      setIsAdmin(isAdminStatus);
    };

    checkAdminStatus();
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/post/:id" element={<Post />} />
        <Route element={<PrivateRoute isAuthenticated={!isAuthenticated} redirectPath={'/'} />}>
          <Route path="/auth" element={<Auth />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/profile/:id/" element={<Profile />} />
          <Route path="/profile/" element={<Profile />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/createPost/:id" element={<CreatePost />} />
          <Route path="/editPost/:id" element={<EditPost />} />
        </Route>
        <Route element={<PrivateRoute isAuthenticated={isAdmin} redirectPath={'/'} />}>
          <Route path="/admin-panel" element={<Admin />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter

//todo (edit post img) auth by socialMedia, improve like summary for every user, 404-page, auth tranclation

// Также пользователь может поставить лайк собственно самому обзору (не более 1 на обзор от 1 пользователя), 
// эти лайки складываются по всем обзорам пользователя и отображаются рядом с именем пользователя.

// Обязательно: Bootstrap (или любой другой CSS-фреймворк), поддержка разных разрешений (в том числе телефон), 
// ORM/ODM для доступа к данным, движок для полнотекстового поиск 
// (или средствами базы, или отдельный движок — НЕ ПОЛНОЕ СКАНИРОВАНИЕ селектами). 

// На главной странице отображаются: последние добавленные обзоры, обзоры с самыми большими оценками, облако тэгов.