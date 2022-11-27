import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    username: null,
    firstname: null,
    userId: null,
    tweets: null,
    likedTweets: null,
    avatar: null
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.firstname = action.payload.firstname;
      state.value.userId = action.payload.userId;
      state.value.tweets = action.payload.tweets;
      state.value.likedTweets = action.payload.likedTweets;
      state.value.avatar = action.payload.avatar;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.firstname = null;
      state.value.userId = null;
      state.value.tweets = null;
      state.value.likedTweets = null;
      state.value.avatar = null;
    }
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
