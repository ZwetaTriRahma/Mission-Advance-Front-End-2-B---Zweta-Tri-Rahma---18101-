import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";

const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});

export default store;