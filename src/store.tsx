import { configureStore } from '@reduxjs/toolkit';
import salesDataReducer from './features/salesDataSlice';

const store = configureStore({
  reducer: {
    salesData: salesDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
