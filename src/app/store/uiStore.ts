import { create } from "zustand";

type UIState = {
  sidebarOpen: boolean;
  toast: { show: boolean; message?: string };
  openSidebar: () => void;
  closeSidebar: () => void;
  showToast: (message: string) => void;
  hideToast: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  toast: { show: false, message: "" },
  openSidebar: () => set({ sidebarOpen: true }),
  closeSidebar: () => set({ sidebarOpen: false }),
  showToast: (message: string) =>
    set({ toast: { show: true, message } }, false),
  hideToast: () => set({ toast: { show: false, message: "" } }),
}));
