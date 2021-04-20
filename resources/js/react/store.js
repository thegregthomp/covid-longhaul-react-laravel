import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './store/rootSlice'

export default configureStore({
  reducer: {
      root: rootReducer
  },
})
