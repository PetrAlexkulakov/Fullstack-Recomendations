import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Main from './Main';
import Post from './Post';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
