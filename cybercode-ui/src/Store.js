import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getAccountDetailsApi } from "./api/User.js";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      userNotes: {}, // Currently edited notes
      originalNotes: {}, // Original notes fetched from the server

      login: (userData, token) =>
        set(() => ({
          user: userData,
          isAuthenticated: true,
          token: token,
        })),

      logout: () =>
        set(() => ({
          user: null,
          isAuthenticated: false,
          token: null,
          userNotes: {},
          originalNotes: {},
        })),

      initializeAuth: async (token, userId, userDetails) => {
        try {
          // Validate token and get user data
          const response = userDetails
            ? { status: 200, data: JSON.parse(userDetails) }
            : await getAccountDetailsApi({ userId, token });

          if (response.status === 200) {
            const user = response.data;

            // save the user in session storage if not exist
            if (!userDetails) {
              sessionStorage.setItem("user_details", JSON.stringify(user));
            }

            set(() => ({
              user: user,
              isAuthenticated: true,
              token: token,
            }));
          } else {
            set(() => ({
              user: null,
              isAuthenticated: false,
              token: null,
            }));
          }
        } catch (error) {
          set(() => ({
            user: null,
            isAuthenticated: false,
            token: null,
          }));
        }
      },

      // Set user notes
      setUserNote: (problemId, noteContent) =>
        set((state) => ({
          userNotes: {
            ...state.userNotes,
            [problemId]: noteContent,
          },
        })),

      // Set original note
      setOriginalNote: (problemId, noteContent) =>
        set((state) => ({
          originalNotes: {
            ...state.originalNotes,
            [problemId]: noteContent,
          },
        })),

      // Delete user note function
      deleteOriginalAndUserNote: (problemId) =>
        set((state) => {
          const { [problemId]: _, ...remainingNotes } = state.userNotes;
          const { [problemId]: __, ...remainingOriginalNotes } =
            state.originalNotes;
          return {
            userNotes: remainingNotes,
            originalNotes: remainingOriginalNotes,
          };
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
