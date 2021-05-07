import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import CustomInput from '../../components/form-controls/CustomInput';
import CustomButton from '../../components/form-controls/CustomButton';
import { startPasswordUpdate } from '../../redux/actions/auth';

const fieldNames = {
  currentPassword: 'currentPassword',
  newPassword: 'newPassword',
  confirmNewPassword: 'confirmNewPassword'
};

const schema = yup.object().shape({
  [fieldNames.currentPassword]: yup
    .string()
    .required('campo requerido')
    .min(6, 'mínimo 6 caracteres'),
  [fieldNames.newPassword]: yup
    .string()
    .required('campo requerido')
    .min(6, 'mínimo 6 caracteres'),
  [fieldNames.confirmNewPassword]: yup
    .string()
    .required('campo requerido')
    .min(6, 'mínimo 6 caracteres')
    .oneOf([yup.ref(fieldNames.newPassword)], 'Las contraseñas deben coincidir')
});

const Password = () => {
  const methods = useForm({
    resolver: yupResolver(schema)
  });

  const dispatch = useDispatch();
  const authUi = useSelector((state) => state.authUi);
  const auth = useSelector((state) => state.auth);

  const onSubmit = ({ currentPassword, newPassword }) => {
    if (!authUi.loading) {
      dispatch(
        startPasswordUpdate(
          auth.email,
          currentPassword,
          newPassword,
          methods.reset
        )
      );
    }
  };
  return (
    <div
      style={{ maxWidth: 500 }}
      className="mx-auto border fade-anim rounded-3 p-4 shadow-sm bg-white"
    >
      <h3>Cambiar contraseña</h3>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="row g-3">
          <CustomInput
            type="password"
            name={fieldNames.currentPassword}
            label="Contraseña"
            placeholder="Ingresa tu contraseña actual"
          />

          <CustomInput
            type="password"
            name={fieldNames.newPassword}
            label="Nueva contraseña"
            placeholder="Mínimo 6 dígitos"
          />

          <CustomInput
            type="password"
            name={fieldNames.confirmNewPassword}
            label="Confirma nueva contraseña"
            placeholder="Mínimo 6 dígitos"
          />

          <CustomButton
            loading={authUi.loading}
            type="submit"
            className="btn btn-primary text-white w-100"
          >
            Cambiar contraseña
          </CustomButton>
        </form>
      </FormProvider>
    </div>
  );
};

export default Password;
