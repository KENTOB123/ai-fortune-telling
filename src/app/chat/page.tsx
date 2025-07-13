'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSessionStore } from '@/lib/useSessionStore';
import { getFortunerById } from '@/lib/fortuners';
import Image from 'next/image';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'fortuner';
  timestamp: Date;
}

export default function ChatPage() {
  const { fortuner: fortunerId, spreadType } = useSessionStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const fortuner = fortunerId ? getFortunerById(fortunerId) : null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // 初期メッセージ
    if (fortuner && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: `こんにちは。私は${fortuner.name}です。${fortuner.catchphrase} 何でもお聞かせください。`,
        sender: 'fortuner',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [fortuner, messages.length]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || !fortuner) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // 占い師の返信をシミュレート
    setTimeout(() => {
      const responses = [
        `${fortuner.name}の直感によると、あなたの質問には良い兆しが見えます。`,
        `カードが示すのは、あなたが思っている以上に力強い存在だということです。`,
        `現在の状況を冷静に見つめることで、新しい道筋が見えてくるでしょう。`,
        `あなたの心の声に耳を傾けることが、今最も大切なことです。`,
        `過去の経験が、今のあなたを支えています。自信を持って進んでください。`
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const fortunerMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'fortuner',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, fortunerMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!fortuner) {
    return (
      <div className="min-h-screen bg-midnight-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60 mb-4">占い師が選択されていません</p>
          <a href="/flow" className="text-royalGold-400 hover:text-royalGold-300">
            占いを始める
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight-950 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 占い師カード */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-surface-900 border border-surface-800 rounded-xl p-6 sticky top-24"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="text-center">
                {/* 占い師画像 */}
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-royalGold-500/30">
                    <Image
                      src={fortuner.imageUrl.replace('.png', '.svg')}
                      alt={`${fortuner.name} - ${fortuner.title}`}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* 占い師情報 */}
                <h2 className="text-xl font-mystical text-royalGold-400 mb-2">
                  {fortuner.name}
                </h2>
                <p className="text-mystic-300 text-sm mb-3">
                  {fortuner.title}
                </p>
                <p className="text-white/60 text-xs mb-4 italic">
                  "{fortuner.tagline}"
                </p>

                {/* 得意分野 */}
                <div className="mb-4">
                  <p className="text-white/60 text-xs mb-2">得意分野:</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {fortuner.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-mystic-500/20 text-mystic-300 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 占い種別 */}
                {spreadType && (
                  <div className="p-3 bg-surface-800 rounded-lg">
                    <p className="text-white/60 text-xs mb-1">現在の占い</p>
                    <p className="text-royalGold-400 text-sm font-medium">
                      {spreadType}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* チャットウィンドウ */}
          <div className="lg:col-span-3">
            <motion.div
              className="bg-surface-900 border border-surface-800 rounded-xl h-[600px] flex flex-col"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {/* チャットヘッダー */}
              <div className="p-4 border-b border-surface-800">
                <h3 className="text-lg font-mystical text-royalGold-400">
                  {fortuner.name}との対話
                </h3>
                <p className="text-white/60 text-sm">
                  あなたの疑問や悩みを何でもお聞かせください
                </p>
              </div>

              {/* メッセージエリア */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-royalGold-500 text-white'
                          : 'bg-surface-800 text-white'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className="text-xs opacity-60 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* タイピングインジケーター */}
                {isTyping && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="bg-surface-800 text-white px-4 py-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* 入力エリア */}
              <div className="p-4 border-t border-surface-800">
                <div className="flex space-x-3">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="メッセージを入力してください..."
                    className="flex-1 bg-surface-800 border border-surface-700 rounded-lg px-4 py-3 text-white placeholder-white/40 resize-none focus:outline-none focus:border-royalGold-500/50"
                    rows={2}
                    disabled={isTyping}
                  />
                  <motion.button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isTyping}
                    className="bg-royalGold-500 text-white p-3 rounded-lg hover:bg-royalGold-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <PaperAirplaneIcon className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 