import { createSlice } from '@reduxjs/toolkit'

export const rootSlice = createSlice({
  name: 'root',
  initialState: {
    value: 0,
  },
  reducers: {

  },
})

// Action creators are generated for each case reducer function
export const { } = rootSlice.actions

export default rootSlice.reducer
