import { firebase, googleAuthProvider } from '../../firebase';
import { types } from '../types/types';
import toast from 'react-hot-toast';

export const startLoginWithEmailPassword = (email, password) => {
  return async (dispatch) => {
    const loginResult = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const { user } = loginResult;
    dispatch(login(user.uid, user.displayName, user.photoURL));
    toast.success('Inicio de sesión exitoso');
  };
};

export const startRegisterWithEmailPassword = (email, password, name) => {
  return async (dispatch) => {
    const registerResult = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const { user } = registerResult;
    await user.updateProfile({
      displayName: name,
    });

    dispatch(login(user.uid, user.displayName, user.photoURL));

    toast.success('Registro exitoso!');
    console.log(registerResult);
  };
};

export const startGoogleLogin = () => {
  return async (dispatch) => {
    const loginResult = await firebase
      .auth()
      .signInWithPopup(googleAuthProvider);

    const { user } = loginResult;
    dispatch(login(user.uid, user.displayName, user.photoURL));
  };
};

export const login = (uid, displayName, photoURL) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
    photoURL,
  },
});

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
  };
};

export const logout = () => ({
  type: types.logout,
});
