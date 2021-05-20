import { useState, useEffect, useMemo } from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import CustomInput from '../../components/form-controls/CustomInput';
import CustomButton from '../../components/form-controls/CustomButton';
import { startAccountDeletion } from '../../redux/actions/auth';
import BackLink from '../../components/BackLink';

const fieldNames = {
  password: 'password'
};

const schema = yup.object().shape({
  [fieldNames.password]: yup
    .string()
    .required('campo requerido')
    .min(6, 'mínimo 6 caracteres')
});

const DeleteAccount = () => {
  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch();
  const authUi = useSelector((state) => state.authUi);
  const auth = useSelector((state) => state.auth);

  const defaultValues = useMemo(
    () => ({
      [fieldNames.password]: ''
    }),
    []
  );
  const methods = useForm({
    resolver:
      auth.providerId === 'google.com' ? undefined : yupResolver(schema),
    defaultValues
  });

  const password = useWatch({
    control: methods.control,
    name: fieldNames.password,
    defaultValue: defaultValues
  });

  useEffect(() => {
    if (password.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password]);

  const onSubmit = ({ password }) => {
    if ((!authUi.loading && !disabled) || auth.providerId === 'google.com') {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción es irreversible, todos tus datos se eliminarán.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d84545',
        cancelButtonColor: '#aeaeae',
        confirmButtonText: 'Borrar cuenta',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(startAccountDeletion(password));
        }
      });
    }
  };

  return (
    <div
      style={{ maxWidth: 500 }}
      className="mx-auto border fade-anim rounded-3 p-4 shadow-sm bg-white"
    >
      <BackLink to="/perfil">Ir a perfil</BackLink>
      <h3 className="mb-3">Borrar cuenta</h3>
      {auth.providerId === 'google.com' ? (
        <p>
          Para borrar tu cuenta se te pedirá que inicies sesión con tu cuenta de
          Google.
        </p>
      ) : (
        <p>Debes ingresar tu contraseña para borrar la cuenta.</p>
      )}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="row g-3">
          {auth.providerId !== 'google.com' && (
            <CustomInput
              type="password"
              name={fieldNames.password}
              placeholder="Ingresa tu contraseña"
            />
          )}

          <CustomButton
            disabled={auth.providerId !== 'google.com' ? disabled : false}
            loading={authUi.loading}
            type="submit"
            className="btn btn-danger text-white w-100"
          >
            Borrar cuenta
          </CustomButton>
        </form>
      </FormProvider>
    </div>
  );
};

export default DeleteAccount;
