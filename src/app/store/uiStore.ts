import { create } from "zustand";

interface UIState {
  sidebarOpen: boolean;
  toast: { show: boolean; message: string };
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  showToast: (message: string) => void;
  hideToast: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  toast: { show: false, message: "" },
  openSidebar: () => set({ sidebarOpen: true }),
  closeSidebar: () => set({ sidebarOpen: false }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  showToast: (message) => set({ toast: { show: true, message } }),
  hideToast: () => set({ toast: { show: false, message: "" } }),
}));
