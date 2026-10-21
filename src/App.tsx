import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import NotFound from './pages/NotFound';

export default function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth') === 'true');

  const handleLogout = () => {
    localStorage.removeItem('isAuth');
    setIsAuth(false);
  };

  return (
    <BrowserRouter>
      <nav style={{ padding: '10px', background: '#7fe08f', display: 'flex', gap: '10px' }}>
        <Link to="/">Trang chủ</Link>
        {isAuth ? (
          <>
            <Link to="/create">Thêm</Link>
            <button onClick={handleLogout}>Đăng xuất</button>
          </>
        ) : (
          <Link to="/login">Đăng nhập</Link>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/login" element={<Login setAuth={setIsAuth} />} />
        <Route path="/create" element={isAuth ? <CreatePost /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}