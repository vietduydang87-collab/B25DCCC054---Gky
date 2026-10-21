import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Post } from '../types';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setError('Nhập lại');
      return;
    }

    const newPost: Post = {
      id: Date.now(), 
      title,
      body,
      userId: 1
    };

    const localPosts = JSON.parse(localStorage.getItem('localPosts') || '[]');
    localStorage.setItem('localPosts', JSON.stringify([newPost, ...localPosts]));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}
     style={{
        border: '2px solid #ddd',       
        borderRadius: '8px',            
        padding: '20px',                
         maxWidth: '500px',             
        margin: '20px auto',           
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
        display: 'flex',                 
        flexDirection: 'column',
        gap: '15px'
     }}
     >

      <h2>Thêm bài viết</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input placeholder="Tên bài viết" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Nội dung" value={body} onChange={e => setBody(e.target.value)} />
      <button type="submit">Thêm</button>
    </form>
  );
}