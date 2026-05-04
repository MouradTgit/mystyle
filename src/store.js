import { create } from "zustand";

export const useStore = create((set) => ({
  selectedStyle: "streetwear",
  image: "",
  favorites: [],
  loading: false,
  error: null,

  setStyle: (style) => set({ selectedStyle: style }),

  setImage: (img) => set({ image: img }),

  addFavorite: (img) =>
    set((state) => ({
      favorites: [...state.favorites, img],
    })),
}));