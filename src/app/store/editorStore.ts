import { create } from "zustand";

interface EditorState {
  title: string;
  content: string;
  slug: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setSlug: (slug: string) => void;
  reset: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  title: "",
  content: "",
  slug: "",
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setSlug: (slug) => set({ slug }),
  reset: () => set({ title: "", content: "", slug: "" }),
}));
