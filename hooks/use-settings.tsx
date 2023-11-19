import { SettingsState } from "@/types";
import { create } from "zustand";

export const useSettings = create<SettingsState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
