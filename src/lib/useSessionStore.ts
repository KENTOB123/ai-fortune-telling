import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SPREADS, SpreadKey } from './spreadConfig';

interface SessionState {
  fortuner: string | null;
  spreadType: SpreadKey | null;
  selectedCards: string[];
  readingHistory: any[];
  favorites: string[];
  requiredCards: number;
  setFortuner: (fortunerId: string) => void;
  setSpreadType: (spreadType: SpreadKey) => void;
  setSelectedCards: (cards: string[]) => void;
  addToHistory: (reading: any) => void;
  addToFavorites: (fortunerId: string) => void;
  removeFromFavorites: (fortunerId: string) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      fortuner: null,
      spreadType: null,
      selectedCards: [],
      readingHistory: [],
      favorites: [],
      requiredCards: 3,
      
      setFortuner: (fortunerId: string) => {
        set({ fortuner: fortunerId });
      },
      
      setSpreadType: (spreadType: SpreadKey) => {
        const requiredCards = SPREADS[spreadType].cards;
        set({ spreadType, requiredCards });
      },
      
      setSelectedCards: (cards: string[]) => {
        set({ selectedCards: cards });
      },
      
      addToHistory: (reading: any) => {
        const { readingHistory } = get();
        const newHistory = [
          {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            ...reading
          },
          ...readingHistory.slice(0, 49) // 最新50件を保持
        ];
        set({ readingHistory: newHistory });
      },
      
      addToFavorites: (fortunerId: string) => {
        const { favorites } = get();
        if (!favorites.includes(fortunerId)) {
          set({ favorites: [...favorites, fortunerId] });
        }
      },
      
      removeFromFavorites: (fortunerId: string) => {
        const { favorites } = get();
        set({ favorites: favorites.filter(id => id !== fortunerId) });
      },
      
      clearSession: () => {
        set({ 
          fortuner: null, 
          spreadType: null, 
          selectedCards: [] 
        });
      },
    }),
    {
      name: 'fortune-session',
      partialize: (state) => ({
        readingHistory: state.readingHistory,
        favorites: state.favorites,
      }),
    }
  )
); 