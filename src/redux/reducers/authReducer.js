import { types } from '../types/types';

export const authReducer = (state = { userData: {} }, action) => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        uid: action.payload.uid,
        email: action.payload.email,
        fullName: action.payload.fullName,
        photoURL: action.payload.photoURL,
        providerId: action.payload.providerId
      };
    case types.setUserData:
      return { ...state, userData: { ...state.userData, ...action.payload } };
    case types.logout:
      return { userData: {} };
    default:
      return state;
  }
};
