import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants/api";
import { persist, createJSONStorage } from "zustand/middleware";

// Setup storage adapter
const storage = createJSONStorage(() => AsyncStorage);

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      isCheckingAuth: true, // Start as true

      signup: async (username, email, password) => {
        set({ isLoading: true });
        try {
          const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.message || "Something went wrong");
          set({ isLoading: false });
          return; 
        } catch (error) {
          set({ isLoading: false });
          throw error; 
        }
      },

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.message || "Something went wrong");
          set({ token: data.token, user: data.user, isLoading: false });
          return; 
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      // This function is called by your _layout.jsx file
      checkAuth: async () => {
        try {
          // This manually checks storage
          const token = await AsyncStorage.getItem("auth-storage"); // Get the raw storage item
          if (token) {
            const { state } = JSON.parse(token); // Parse the storage object
            set({ token: state.token, user: state.user }); // Set the state
          }
        } catch (error) {
          console.log("Auth check failed", error);
          set({ token: null, user: null }); // Clear state on error
        } finally {
          set({ isCheckingAuth: false }); // We're done checking
        }
      },

      logout: () => {
        set({ token: null, user: null });
        // The persist middleware will automatically clear storage
      },
    }),
    {
      name: "auth-storage", // Name for the persisted data in AsyncStorage
      storage: storage, 
      partialize: (state) => ({ token: state.token, user: state.user }),
      // We removed the broken onRehydrateStorage
    }
  )
);