import { createSlice } from '@reduxjs/toolkit';

const initialState = { fileList: [] };
const HomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {}
});

export default HomeSlice.reducer;
