import { create } from 'zustand';

interface PlayerStore {
  ids: string[];
  activeId?: string;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
  isShuffle: boolean;
  setIsShuffle: (isShuffle: boolean) => void;
  originalPlaylistOrder: string[];
  playedIds: string[];
  setPlayedIds: (ids: string[]) => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids }),
  reset: () => set({ ids: [], activeId: undefined, playedIds: [] }),
  isShuffle: false,
  setIsShuffle: (isShuffle: boolean) => {
    set((state) => {
      if (isShuffle && !state.isShuffle) {
        return { ...state, isShuffle, originalPlaylistOrder: state.ids };
      } else if (!isShuffle && state.isShuffle) {
        return { ...state, isShuffle, ids: state.originalPlaylistOrder };
      }
      return { ...state, isShuffle };
    });
  },
  originalPlaylistOrder: [],
  playedIds: [],
  setPlayedIds: (ids: string[]) => set({ playedIds: ids }),
}));

export default usePlayer;
