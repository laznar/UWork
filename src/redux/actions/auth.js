import { firebase, googleAuthProvider, db } from '../../firebase';
import { types } from '../types/types';
import toast from 'react-hot-toast';
import { renderError } from '../../utils/misc';
import Swal from 'sweetalert2';
import { uploadPhoto } from '../../helpers/uploadPhoto';

export const startLoginWithEmailPassword = (email, password) => {
  return async (dispatch) => {
    dispatch(authUiLoading(true));
    try {
      const loginResult = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const { user } = loginResult;
      console.log(loginResult);

      dispatch(
        login(
          user.uid,
          user.email,
          user.displayName,
          user.photoURL,
          user.providerData[0].providerId
        )
      );
      toast.success('Inicio de sesión exitoso');
    } catch (error) {
      toast.error(renderError(error.code));
    }
    dispatch(authUiLoading(false));
  };
};

export const startRegisterWithEmailPassword = (
  data,
  pendingWorker = false,
  isWorker = false
) => {
  return async (dispatch) => {
    dispatch(authUiLoading(true));
    try {
      // Firebase register
      const registerResult = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password);
      const { user } = registerResult;
      // Update user's displayName
      await user.updateProfile({
        displayName: data.name + ' ' + data.surname
      });

      delete data.password;
      delete data.confirm;
      // Save user in Firestore db
      const userRef = db.collection('users').doc(user.uid);
      await userRef.set({ ...data, pendingWorker, isWorker });

      toast.success('Registro exitoso!');

      login(
        user.uid,
        user.email,
        user.displayName,
        user.photoURL,
        user.providerData[0].providerId
      );
    } catch (error) {
      toast.error(renderError(error.code));
    }
    dispatch(authUiLoading(false));
  };
};

export const startUpdateUserInfo = (data, uid) => {};

export const startRegisterAsWorker = (data, isWorker) => {
  return async (dispatch) => {
    dispatch(authUiLoading(true));
    try {
      const { email, password, name, surname } = data;
      // Firebase register
      const registerResult = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const { user } = registerResult;
      // Update user's displayName
      await user.updateProfile({
        displayName: name + ' ' + surname
      });

      delete data.password;
      delete data.confirm;

      // Save user in Firestore db
      const userRef = db.collection('users').doc(user.uid);
      await userRef.set({ ...data, isWorker });

      toast.success('Registro exitoso!');

      login(
        user.uid,
        user.email,
        user.displayName,
        user.photoURL,
        user.providerData[0].providerId
      );
    } catch (error) {
      toast.error(renderError(error.code));
    }
    dispatch(authUiLoading(false));
  };
};

export const startGoogleLogin = () => {
  return async (dispatch) => {
    dispatch(authUiLoading(true));
    try {
      // Google sign in with pop up
      const loginResult = await firebase
        .auth()
        .signInWithPopup(googleAuthProvider);

      const { user } = loginResult;
      // Save user in Firestore db
      const userRef = db.collection('users').doc(user.uid);

      await userRef.set({
        name: user.displayName,
        email: user.email
      });

      dispatch(
        login(
          user.uid,
          user.email,
          user.displayName,
          user.photoURL,
          user.providerData[0].providerId
        )
      );
    } catch (error) {
      toast.error(renderError(error.code));
    }
    dispatch(authUiLoading(false));
  };
};

export const login = (uid, email, fullName, photoURL, providerId) => ({
  type: types.login,
  payload: {
    uid,
    email,
    fullName,
    photoURL,
    providerId
  }
});

export const startLogout = () => {
  return async (dispatch) => {
    try {
      await firebase.auth().signOut();
      dispatch(logout());
    } catch (error) {
      toast.error(renderError(error.code));
    }
  };
};

export const startSendPasswordResetEmail = (email, reset) => {
  return async (dispatch) => {
    dispatch(authUiLoading(true));
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      toast.success('Link de recuperación enviado');
      reset();
    } catch (error) {
      toast.error(renderError(error.code));
    }
    dispatch(authUiLoading(false));
  };
};

export const startAccountDeletion = () => {
  return async (dispatch) => {
    dispatch(authUiLoading(true));
    try {
      const user = firebase.auth().currentUser;
      const userRef = db.collection('users').doc(user.uid);
      await userRef.delete();
      await user.delete();
      dispatch(logout());
      Swal.fire({
        title: 'Cuenta eliminada',
        text: 'Su cuenta ha sido eliminada exitosamente',
        confirmButtonColor: '#45a8d8',
        icon: 'success'
      });
    } catch (error) {
      toast.error(renderError(error.code));
    }
    dispatch(authUiLoading(false));
  };
};

export const startUpdateUserData = (data, pendingWorker, isWorker) => {
  return async (dispatch) => {
    dispatch(authUiLoading(true));
    try {
      const user = firebase.auth().currentUser;
      const userRef = db.collection('users').doc(user.uid);
      if (data.photo) {
        const photoURL = await uploadPhoto(data.photo[0]);
        await user.updateProfile({ photoURL });

        data.photo = photoURL;
      } else {
        delete data.photo;
      }
      await userRef.update({ ...data, pendingWorker, isWorker });
      dispatch(setUserData({ ...data, pendingWorker, isWorker }));
      Swal.fire({
        title: 'Perfil completo',
        text: 'Ahora eres un worker',
        confirmButtonColor: '#45a8d8'
      });
    } catch (error) {
      console.log(error);
      toast.error(renderError(error.code));
    }
    dispatch(authUiLoading(false));
  };
};

export const startPasswordUpdate = (email, password, newPassword, reset) => {
  return async (dispatch) => {
    dispatch(authUiLoading(true));

    try {
      const credential = firebase.auth.EmailAuthProvider.credential(
        email,
        password
      );
      // Re-authentiicate user to check old password
      await firebase
        .auth()
        .currentUser.reauthenticateWithCredential(credential);
      // Update user password
      firebase.auth().currentUser.updatePassword(newPassword);
      toast.success('Contraseña actualizada');
      reset();
    } catch (error) {
      toast.error(renderError(error.code));
    }
    dispatch(authUiLoading(false));
  };
};

export const setUserData = (userData) => ({
  type: types.setUserData,
  payload: userData
});

export const logout = () => ({
  type: types.logout
});

const authUiLoading = (loading = false) => ({
  type: types.loading,
  payload: loading
});
