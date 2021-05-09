import { types } from '../types/types';

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        email: action.payload.email,
        name: action.payload.name,
        surname: action.payload.surname,
        fullName: action.payload.fullName,
        photoURL: action.payload.photoURL
      };
    case types.logout:
      return {};
    default:
      return state;
  }
};
