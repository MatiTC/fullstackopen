import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: 'Initial notification message',
  timeoutId: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      const { message } = action.payload;
      state.message = message;
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
      }
    },
    clearNotification: (state) => {
      state.message = '';
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
        state.timeoutId = null;
      }
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
