import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Blogs: [],
};

export const BlogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.Blogs = action.payload;
    },
  },
});

export const { setBlogs } = BlogsSlice.actions;
export default BlogsSlice.reducer;
