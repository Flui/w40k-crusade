import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useKeywordStore = create(
  persist<{
    keywordOptions: string[];
    addKeywordOption: (keyword: string) => void;
  }>(
    (set) => ({
      keywordOptions: [],
      addKeywordOption: (keyword) => {
        set((state) => ({
          keywordOptions: [...state.keywordOptions, keyword],
        }));
      },
    }),
    { name: "w40k-crusade-keywords" }
  )
);
