import { create } from "zustand";

type SidebarStore = {
  isMinimized: boolean;
  toggle: () => void;
};

export const useSidebar = create<SidebarStore>((set) => ({
  isMinimized: false,
  toggle: () => set((state) => ({ isMinimized: !state.isMinimized })),
}));
