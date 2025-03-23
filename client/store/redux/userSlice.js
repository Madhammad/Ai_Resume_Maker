  import { createSlice } from "@reduxjs/toolkit";

  const initialState = {
    currentUser: null,
    token: null,
  };

  const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

      signIn: (state, action) => {
        state.currentUser = action.payload.user;
        state.token = action.payload.token
      },


    signOut: (state) => {
      state.currentUser = null;
      state.token = null;
    },


    update: (state, action) => {
      state.currentUser = action.payload;
    },

  },
});

export const {
  signIn,
  signOut,
  update,
} = userSlice.actions;

export default userSlice.reducer;
