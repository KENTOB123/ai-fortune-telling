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
        <div className="fixed inset-0 grid place-items-center z-50">
          <Dialog.Content className="bg-surface-900/80 backdrop-blur-sm border border-surface-800 rounded-xl max-w-lg w-[90vw] max-h-[80vh] overflow-auto p-6 space-y-6 mx-4 text-center">
            <Dialog.Close asChild>
              <button 
                aria-label="Close" 
                className="absolute right-4 top-4 text-white/70 hover:text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-royalGold-500 focus:ring-offset-2 focus:ring-offset-surface-900 transition-colors"
              >
                ✕
              </button>
            </Dialog.Close>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">✨ カードが選ばれました！</h3>
            <p className="text-xl sm:text-2xl text-white/80 leading-relaxed">選ばれたカードからあなたの未来を読み解きます</p>
            <button className="btn-mystic mt-4 w-44 mx-auto" onClick={onStart}>
              占いを開始
            </button>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 