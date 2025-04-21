import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import users from "@/data/users.json";

type UserRole = "admin" | "user";

interface AuthState {
  isAuthenticated: boolean;
  user: {
    name: string;
    role: UserRole;
  } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ name: string; role?: UserRole }>) {
      const user = users.find((user) => user.username === action.payload.name);
      state.isAuthenticated = true;
      state.user = {
        name: action.payload.name,
        role:
          action.payload.role ||
          (user?.role as UserRole) ||
          ("user" as UserRole),
      };
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
