import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import audioBtnReducer from "./AudioBtnSlice"

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    audioBtn: audioBtnReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;