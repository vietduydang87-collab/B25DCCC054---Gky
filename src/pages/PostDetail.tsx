import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Post, Comment } from '../types';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {

    const localPosts: Post[] = JSON.parse(localStorage.getItem('localPosts') || '[]');
    const localPost = localPosts.find(p => p.id === Number(id));

    if (localPost) {
      setPost(localPost);
      setLoading(false);
      return;
    }

    Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    ])
      .then(async ([resPost, resComments]) => {
        if (!resPost.ok) throw new Error('Không tìm thấy bài viết');
        setPost(await resPost.json());
        setComments(await resComments.json());
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Đang tải chi tiết...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      {post && (
        <>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <h3>Bình luận</h3>
          <ul>
            {comments.map(c => (
              <li key={c.id}><strong>{c.name}</strong>: {c.body}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}