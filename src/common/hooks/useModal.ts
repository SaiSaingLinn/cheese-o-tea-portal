import { create } from "zustand";

interface Option {
  title: string;
  subtitle?: string;
  content: string | React.ReactNode;
  actions?: string | React.ReactNode;
}

interface ModalState {
  open: boolean;
  option: Option | undefined;
  closeModal: () => void;
  openModal: (option: Option) => void;
}

export const useModal = create<ModalState>((set) => ({
  open: false,
  option: undefined,
  openModal: (option: Option) => set({ option, open: true }),
  closeModal: () => set({ option: undefined, open: false }),
}));
