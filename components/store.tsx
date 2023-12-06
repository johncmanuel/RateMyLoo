// store.ts
import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './darkModeSlice';

const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
  },
});

export default store;
