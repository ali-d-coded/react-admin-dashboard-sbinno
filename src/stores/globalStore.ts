import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface LoginReqUser {
  email?: string;
  password?: string;
}

interface LoginRes {
  message: string;
}

const staticUser: User = {
  id: "1",
  name: "John",
  email: "john@example.com",
  password: "123456",
};

interface GlobalState {
  darkMod: boolean;
  toggleDarkMode: () => void;

  isAuthenticated: boolean;
  user: Omit<User, "password"> | null;
  token: string | null;

  login: (credentials: LoginReqUser) => LoginRes;
  logout: () => void;

  updateUser: (updates: Partial<Omit<User, "id" | "password">>) => void;
}

const useGlobalStore = create<GlobalState>()(
  persist(
    (set, get) => ({
      darkMod: false,
      toggleDarkMode: () =>
        set((state) => ({ darkMod: !state.darkMod })),

      isAuthenticated: false,
      user: null,
      token: null,

      login: ({ email, password }) => {
        if (email === staticUser.email && password === staticUser.password) {
          const { password, ...userWithoutPassword } = staticUser;
          set(() => ({
            isAuthenticated: true,
            user: userWithoutPassword,
            token: "fake-jwt-token",
          }));
          return { message: "Login successful" };
        } else {
          throw new Error("Invalid credentials");
        }
      },

      logout: () =>
        set(() => ({
          isAuthenticated: false,
          token: null,
          user: null,
        })),

      updateUser: (updates) => {
        const currentUser = get().user;
        if (!currentUser) return;

        set(() => ({
          user: {
            ...currentUser,
            ...updates,
          },
        }));
      },
    }),
    {
      name: "global-storage",
      partialize: (state) => ({
        darkMod: state.darkMod,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
      }),
    }
  )
);


export const useGlobalStoreDarkMode = () => useGlobalStore((state) => state.darkMod);
export const useGlobalStoreToggleDarkMode = () => useGlobalStore((state) => state.toggleDarkMode);

export const useIsAuthenticated = () => useGlobalStore((state) => state.isAuthenticated);
export const useUser = () => useGlobalStore((state) => state.user);
export const useToken = () => useGlobalStore((state) => state.token);
export const useLogin = () => useGlobalStore((state) => state.login);
export const useLogout = () => useGlobalStore((state) => state.logout);
export const useUpdateUser = () => useGlobalStore((state) => state.updateUser);
