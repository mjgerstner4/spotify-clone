import { create } from 'zustand';

interface PlayerStore {
  ids: string[];
  activeId?: string;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
  isShuffle: boolean;
  setIsShuffle: (isShuffle: boolean) => void;
  originalPlaylistOrder: string[]; // Add the originalPlaylistOrder property
}


const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids }),
  reset: () => set({ ids: [], activeId: undefined }),
  isShuffle: false,
  setIsShuffle: (isShuffle: boolean) => {
    set((state) => {
      if (isShuffle && !state.isShuffle) {
        // Save original order when shuffle is turned on
        return { ...state, isShuffle, originalPlaylistOrder: state.ids };
      } else if (!isShuffle && state.isShuffle) {
        // Restore original order when shuffle is turned off
        return { ...state, isShuffle, ids: state.originalPlaylistOrder };
      }
      return { ...state, isShuffle };
    });
  },
  originalPlaylistOrder: [], // Initialize originalPlaylistOrder
}));

export default usePlayer;
