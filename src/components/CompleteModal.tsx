'use client';

import { motion, AnimatePresence } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';

interface CompleteModalProps {
  open: boolean;
  onStart: () => void;
}

export default function CompleteModal({ open, onStart }: CompleteModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={() => onStart()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-surface-900/80 backdrop-blur-sm border border-surface-800 rounded-xl p-8 max-w-lg w-[90vw] mx-4 text-center space-y-6 z-50">
          <Dialog.Close asChild>
            <button aria-label="Close" className="absolute right-4 top-4 text-white/70 hover:text-white">
              ✕
            </button>
          </Dialog.Close>
          <h3 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">✨ カードが選ばれました！</h3>
          <p className="text-xl sm:text-2xl text-white/80 leading-relaxed">選ばれたカードからあなたの未来を読み解きます</p>
          <button className="btn-mystic w-44 mx-auto" onClick={onStart}>
            占いを開始
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 