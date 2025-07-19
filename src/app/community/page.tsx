'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeartIcon, ChatBubbleLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface Post {
  id: string;
  text: string;
  flux: number;
  created_at: string;
  user_id: string;
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/community/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/community/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newPost }),
      });

      if (response.ok) {
        setNewPost('');
        fetchPosts();
      }
    } catch (error) {
      console.error('Failed to submit post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFlux = async (postId: string) => {
    try {
      const response = await fetch(`/api/community/posts/${postId}/flux`, {
        method: 'POST',
      });

      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Failed to flux post:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return '数分前';
    if (diffInHours < 24) return `${diffInHours}時間前`;
    return `${Math.floor(diffInHours / 24)}日前`;
  };

  return (
    <div className="min-h-screen bg-midnight-950 pt-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* ヘッダー */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">コミュニティ</h1>
          <p className="text-white/60">
            占いの体験を共有し、他のユーザーとつながりましょう
          </p>
        </motion.div>

        {/* 投稿フォーム */}
        <motion.div
          className="bg-surface-900 rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmitPost}>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="今日の占い体験を共有してください..."
              className="w-full bg-surface-800 text-white placeholder-white/40 rounded-lg p-4 resize-none h-32 focus:outline-none focus:ring-2 focus:ring-mystic-500"
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-4">
              <span className="text-white/40 text-sm">
                {newPost.length}/500
              </span>
              <button
                type="submit"
                disabled={!newPost.trim() || isSubmitting}
                className="bg-gradient-to-r from-mystic-500 to-mystic-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '投稿中...' : '投稿する'}
              </button>
            </div>
          </form>
        </motion.div>

        {/* 投稿一覧 */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center text-white/60">読み込み中...</div>
          ) : posts.length === 0 ? (
            <div className="text-center text-white/60">
              まだ投稿がありません。最初の投稿をしてみましょう！
            </div>
          ) : (
            posts.map((post, index) => (
              <motion.div
                key={post.id}
                className="bg-surface-900 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-mystic-500 to-mystic-600 rounded-full flex items-center justify-center text-white font-bold">
                    {post.user_id.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="text-white/60 text-sm">
                      匿名ユーザー • {formatDate(post.created_at)}
                    </div>
                  </div>
                </div>

                <p className="text-white mb-4 leading-relaxed">{post.text}</p>

                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleFlux(post.id)}
                    className="flex items-center space-x-2 text-white/60 hover:text-mystic-400 transition-colors"
                  >
                    {post.flux > 0 ? (
                      <HeartIconSolid className="w-5 h-5 text-mystic-400" />
                    ) : (
                      <HeartIcon className="w-5 h-5" />
                    )}
                    <span>{post.flux}</span>
                  </button>

                  <button className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors">
                    <ChatBubbleLeftIcon className="w-5 h-5" />
                    <span>コメント</span>
                  </button>

                  <button className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors">
                    <ShareIcon className="w-5 h-5" />
                    <span>共有</span>
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 