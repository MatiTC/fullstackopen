/* eslint-disable indent */
export const actionTypes = {
  SHOW_NOTIFICATION: 'SHOW_NOTIFICATION',
  HIDE_NOTIFICATION: 'HIDE_NOTIFICATION',
};

export const initialState = {
  message: '',
  show: false,
};

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SHOW_NOTIFICATION:
      return { ...state, message: action.payload, show: true };
    case actionTypes.HIDE_NOTIFICATION:
      return { ...state, message: '', show: false };
    default:
      return state;
  }
};
