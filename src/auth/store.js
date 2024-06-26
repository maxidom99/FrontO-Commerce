import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      profile: "",
      isAuth: false,

      setProfile: (profile) =>
        set(() => ({
          profile,
          isAuth: true
        })),
        
      logout: () =>
        set(() => ({
          token: "",
          isAuth: false,
          profile: null
        }))
    }),
    {
      name: "auth"
    }
  )
);
