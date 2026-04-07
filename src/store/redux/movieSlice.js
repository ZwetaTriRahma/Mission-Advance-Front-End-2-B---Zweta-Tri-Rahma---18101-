import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    trending: [],
    rilsBaru: [],
    loading: false,
    error: null,
  },
  reducers: {
    setTrending: (state, action) => {
      state.trending = action.payload;
    },
    setRilsBaru: (state, action) => {
      state.rilsBaru = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setTrending, setRilsBaru, setLoading, setError } =
  movieSlice.actions;

export default movieSlice.reducer;