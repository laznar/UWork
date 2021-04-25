import { firebase, googleAuthProvider } from '../../firebase';
import { types } from '../types/types';

export const startLoginWithEmailPassword = (email, password) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(login(1231231, 'John'));
    }, 3500);
  };
};

export const startGoogleLogin = () => {
  return async (dispatch) => {
    const authResult = await firebase
      .auth()
      .signInWithPopup(googleAuthProvider);

    const { user } = authResult;
    dispatch(login(user.uid, user.displayName));
    console.log(authResult);
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});
