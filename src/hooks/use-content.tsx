"use client";
import { create } from "zustand";

type TContent = {
    content: any;
    updateContent: (newContent: any) => void;
};

export const useContent = create<TContent>()((set) => ({
    content: {},
    updateContent: (newContent) => set((state) => ({ content: newContent })),
}));
