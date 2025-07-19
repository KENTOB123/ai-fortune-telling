'use client';

import { useState, useEffect } from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface StardustBadgeProps {
  className?: string;
}

export default function StardustBadge({ className = '' }: StardustBadgeProps) {
  const [stardust, setStardust] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/auth/profile');
      if (response.ok) {
        const data = await response.json();
        setStardust(data.stardust || 0);
        setStreak(data.streak || 0);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <motion.div
      className={`flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/30 rounded-full text-sm ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <SparklesIcon className="w-4 h-4 text-amber-400" />
      <span className="text-amber-300 font-semibold">{stardust}</span>
      {streak && streak > 1 && (
        <span className="text-amber-200 text-xs ml-1">
          ({streak}日連続)
        </span>
      )}
    </motion.div>
  );
} 