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

//todo (edit post img) comments, admin, auth by socialMedia
//todo translate

// Под обзором в режиме просмотра (или другими пользователями) 
// в конце отображаются комментарии. Комментарии линейные, 
// нельзя комментировать комментарий, новый добавляется только "в хвост". 
// Автоматическая подгрузка комментариев — если у меня открыта страница с комментариями и 
// кто-то другой добавляет новый, он автомагически появляется (возможна задержка в 2-5 секунд). 