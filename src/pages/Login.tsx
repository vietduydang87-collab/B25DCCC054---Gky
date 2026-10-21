import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ setAuth }: { setAuth: (val: boolean) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === '123456') {
      localStorage.setItem('isAuth', 'true');
      setAuth(true);
      navigate('/');
    } else {
      setError('Sai tài khoản hoặc mật khẩu');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Đăng nhập</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input placeholder="Tài khoản" value={username} onChange={e => setUsername(e.target.value)} /><br/>
      <input type="password" placeholder="Mật khẩu" value={password} onChange={e => setPassword(e.target.value)} /><br/>
      <button type="submit">Đăng nhập</button>
    </form>
  );
}