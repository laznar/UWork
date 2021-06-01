import { chatTypes } from '../types/types';

export const chatReducer = (
  state = { loading: true, sendingLoading: false, messages: [] },
  action
) => {
  switch (action.type) {
    case chatTypes.setChatData:
      return { ...state, ...action.payload };
    case chatTypes.setChatLoading:
      return { ...state, loading: action.payload };
    case chatTypes.setSendingLoading:
      return { ...state, sendingLoading: action.payload };
    default:
      return state;
  }
};
