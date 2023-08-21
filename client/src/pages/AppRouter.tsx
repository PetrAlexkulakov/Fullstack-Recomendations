import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Main from './Main';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
