import { types } from '../types/types';

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        email: action.payload.email,
        fullName: action.payload.fullName,
        photoURL: action.payload.photoURL
      };
    case types.setUserData:
      return { ...state, userData: { ...state.userData, ...action.payload } };
    case types.logout:
      return {};
    default:
      return state;
  }
};
