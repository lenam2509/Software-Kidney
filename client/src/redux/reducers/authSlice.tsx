import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface authState {
  isAuth: boolean;
  user: {
    id?: number;
    email?: string;
    role?: string;
  };
  token: string;
}

const initialState: authState = {
  isAuth: false,
  user: {},
  token: "",
};

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<authState>) => {
      state.isAuth = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state: authState) => {
      state.isAuth = false;
      state.user = {};
      state.token = "";
    },
    updateUser: (state, action: PayloadAction<authState>) => {
      state.user = action.payload.user;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, updateUser } = counterSlice.actions;

export default counterSlice.reducer;
