import { create } from "zustand";

export const useStore = create((set) => ({
  selectedStyle: "streetwear",
  images: [],
  favorites: [],
  loading: false,
  error: null,

  setStyle: (style) => set({ selectedStyle: style }),

  setImages: (imgs) => set({ images: imgs }),

  addFavorite: (img) =>
    set((state) => ({
      favorites: [...state.favorites, img],
    })),
}));