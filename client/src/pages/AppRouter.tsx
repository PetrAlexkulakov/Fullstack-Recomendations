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

const AppRouter = () => {
  const [isAuthenticated] = useState(checkIsAuthenticated())
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const isAdminStatus = await checkIsAdmin();
      setIsAdmin(isAdminStatus);
    };

    checkAdminStatus();
  }, []);

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
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/createPost/:id" element={<CreatePost />} />
          <Route path="/editPost/:id" element={<EditPost />} />
        </Route>
        <Route element={<PrivateRoute isAuthenticated={isAdmin} redirectPath={'/'} />}>
          <Route path="/admin-panel" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter

//todo (edit post img) auth by socialMedia