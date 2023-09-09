import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import Main from './Main';
import Post from './Post';
import Auth from './Auth';
import { checkIsAuthenticated } from '../shared/authentification/isAuthenticated';
import PrivateRoute from '../components/PrivateRoute';
import Register from './Register';
import Profile from './Profile';
import CreatePost from './CreatePost';
import EditPost from './EditPost';

const AppRouter = () => {
  const [isAuthenticated] = useState(checkIsAuthenticated())
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/editPost/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter

//todo (edit post img) comments, raiting, admin, auth by socialMedia
//todo translate

// Каждый пользовать может проставить "рейтинг" (1..5 звезд) произведению 
// (не более одного от одного пользователя на один обзор или произведение если реализуются опциональные требования)
//  — средний пользовательский рейтинг отображается рядом с названием обзора 
//  (или произведения если реализуются опциональные требования) везде на сайте.

// Также пользователь может поставить лайк собственно самому обзору (не более 1 на обзор от 1 пользователя), 
// эти лайки складываются по всем