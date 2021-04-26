import { firebase, googleAuthProvider } from '../../firebase';
import { types } from '../types/types';
import toast from 'react-hot-toast';

export const startLoginWithEmailPassword = (email, password) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(login(1231231, 'John'));
    }, 3500);
  };
};

export const startRegisterWithEmailPassword = (email, password, name) => {
  return async (dispatch) => {
    const registerResult = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await registerResult.user.updateProfile({
      displayName: name,
    });

    toast.success('Registro exitoso!');
    console.log(registerResult);
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
