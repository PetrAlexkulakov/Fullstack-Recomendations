import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import Main from './Main';
import Post from './Post';
import Auth from './Auth';
import { checkIsAuthenticated } from '../shared/authentification/isAuthenticated';
import PrivateRoute from '../components/PrivateRoute';

const AppRouter = () => {
  const [isAuthenticated] = useState(checkIsAuthenticated())
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/post/:id" element={<Post />} />
        <Route element={<PrivateRoute isAuthenticated={!isAuthenticated} redirectPath={'/'} />}>
          <Route path="/auth" element={<Auth />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter

//todo authorize -> comments, likes, raiting, admin, auth by socialMedia, creating -> markdown
//todo translate