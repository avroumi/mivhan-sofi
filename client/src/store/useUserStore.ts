import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { User } from "../types/UsersTypes";

interface AuthStoreZustand {
  user: User | null;
  token: string | null;
  setAdd: (user: User, token: string) => void;
  logout: () => void;
}

const authStore = create<AuthStoreZustand>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAdd: (user: User, token: string) =>
        set({
          user: user,
          token: token,
          
        }),
      logout: () =>
        set({
          user: null,
          token: null,
        }),
    }),
    { name: "auth-storage" },
  ),
);

export default authStore;
