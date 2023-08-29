import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Main from './Main';
import Post from './Post';
import Auth from './Auth';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter

//todo authorize -> comments, likes, raiting, admin, auth by socialMedia, creating -> markdown
//todo translate