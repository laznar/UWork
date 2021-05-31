import { chatTypes } from '../types/types';

export const chatReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case chatTypes.getChatData:
      return { ...state, ...action.payload };
    case chatTypes.setChatLoading:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
