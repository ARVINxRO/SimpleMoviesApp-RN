import { create } from "zustand";

export const useBookmarkStore = create((set, get) => ({
  bookmarks: [1, 2, 3],
  addBookmark: (id) => {
    if (!get().bookmarks.includes(id)) {
      set((state) => ({ bookmarks: [...state.bookmarks, id] }));
    }
  },
  removeBookmark: (id) =>
    set((state) => ({
      bookmarks: state.bookmarks.filter((movie_id) => movie_id !== id),
    })),
}));
