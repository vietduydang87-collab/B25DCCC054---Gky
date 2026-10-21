import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '../types';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        if (!res.ok) throw new Error('Lỗi');
        return res.json();
      })
      .then((data: Post[]) => {
        const localPosts = JSON.parse(localStorage.getItem('localPosts') || '[]');
        setPosts([...localPosts, ...data]);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts = posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Danh sách</h1>
      <input 
        type="text" 
        placeholder="Tìm kiếm" 
        value={search} 
        onChange={e => setSearch(e.target.value)} 
        style = {{
            textAlign: 'center',
            padding: '5px',
            width: '200px'
        }}
      />
      <ul>
        {filteredPosts.map(post => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}