import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: { name: string } | undefined;
  setUser: (usr: { name: string }) => void;
  removeUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: undefined,
      setUser: (val) => set(() => ({ user: val })),
      removeUser: () => set(() => ({ user: undefined })),
    }),
    {
      name: "usr", // name of the item in the storage (must be unique)
    }
  )
);
