import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const audioBtnSlice = createSlice({
  name: "audioBtnState",
  initialState: {
    hasText: false,
  },
  reducers: {
    setHasText: (state, action: PayloadAction<boolean>) => {
      state.hasText = action.payload;
    },
  },
});

export const { setHasText } = audioBtnSlice.actions;
export default audioBtnSlice.reducer;