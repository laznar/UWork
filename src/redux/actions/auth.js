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

      dispatch(
        login(
          user.uid,
          user.email,
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

      delete data.password;
      delete data.confirm;
      // Save user in Firestore db
      const userRef = db.collection('users').doc(user.uid);
      await userRef.set({ ...data, pendingWorker, isWorker });

      toast.success('Registro exitoso!');

      login(
        user.uid,
        user.email,
        user.photoURL,
        user.providerData[0].providerId
      );
    } catch (error) {
      toast.error(renderError(error.code));
    }
    dispatch(authUiLoading(false));
  };
};

export const startEditUserInfo = (data) => {
  return async (dispatch, getState) => {
    dispatch(authUiLoading(true));
    try {
      const user = firebase.auth().currentUser;
      const userRef = db.collection('users').doc(user.uid);

      // Update email
      if (data.email) {
        // Email users
        // TODO: Change email of Google users
        if (getState().auth.providerId !== 'google.com') {
          const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            data.password
          );
          await firebase
            .auth()
            .currentUser.reauthenticateWithCredential(credential);

          await user.updateEmail(data.email);
        }
      }
      // Avoid storing password in db
      if (data.password) {
        delete data.password;
      }
      await userRef.update(data);
      dispatch(setUserData(data));
      toast.success('Información actualizada');
    } catch (error) {
      toast.error(renderError(error.code));
    }
    dispatch(authUiLoading(false));
  };
};

export const startGoogleLogin = (pendingWorker = false) => {
  return async (dispatch) => {
    dispatch(authUiLoading(true));
    try {
      // Google sign in with pop up
      const loginResult = await firebase
        .auth()
        .signInWithPopup(googleAuthProvider);

      const { user } = loginResult;
      // User reference in db
      const userRef = db.collection('users').doc(user.uid);
      // Get user data from db
      const userSnap = await userRef.get();
      let userData;
      // Use existing user data
      if (userSnap.exists) {
        userData = userSnap.data();
      } else {
        // If there is no user data then it is a new user
        userData = user;
        // Store default user data for new user
        await userRef.set({
          name: userData.displayName,
          surname: '',
          photoURL: userData.photoURL,
          email: userData.email,
          worker: false,
          pendingWorker
        });
      }

      dispatch(
        login(
          userData.uid,
          userData.email,
          userData.photoURL,
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

export const login = (uid, email, photoURL, providerId) => ({
  type: types.login,
  payload: {
    uid,
    email,
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

export const startAccountDeletion = (password) => {
  return async (dispatch, getState) => {
    dispatch(authUiLoading(true));
    try {
      const user = firebase.auth().currentUser;
      const state = getState();
      const userRef = db.collection('users').doc(user.uid);
      // TODO: Check if it's safe to delete a user when its uid is used in different collections
      if (state.auth.providerId === 'google.com') {
        await user.reauthenticateWithPopup(googleAuthProvider);
        await userRef.delete();
        await user.delete();
      } else {
        const credential = firebase.auth.EmailAuthProvider.credential(
          user.email,
          password
        );
        await firebase
          .auth()
          .currentUser.reauthenticateWithCredential(credential);
        await userRef.delete();
        await user.delete();
      }

      dispatch(logout());
      Swal.fire({
        title: 'Cuenta eliminada',
        text: 'Tu cuenta ha sido eliminada exitosamente',
        confirmButtonColor: '#45a8d8',
        icon: 'success'
      });
    } catch (error) {
      toast.error(renderError(error.code));
    }
    dispatch(authUiLoading(false));
  };
};

export const startCompleteUserData = (data, pendingWorker, isWorker) => {
  return async (dispatch) => {
    dispatch(authUiLoading(true));
    try {
      const user = firebase.auth().currentUser;
      const userRef = db.collection('users').doc(user.uid);
      if (data.photoURL[0]) {
        const photoURL = await uploadPhoto(data.photoURL[0]);
        await user.updateProfile({ photoURL });

        data.photoURL = photoURL;
      } else {
        delete data.photoURL;
      }
      await userRef.update({ ...data, pendingWorker, isWorker });
      dispatch(setUserData({ ...data, pendingWorker, isWorker }));
      Swal.fire({
        title: 'Perfil completo',
        text: 'Ahora eres un worker',
        confirmButtonColor: '#45a8d8'
      });
    } catch (error) {
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
