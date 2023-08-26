import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Main from './Main';
import Post from './Post';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter

//todo authorize -> comments, likes, raiting, admin, auth by socialMedia, creating -> markdown
//todo search
//todo tags
//todo translate