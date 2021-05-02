import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import CustomInput from '../../components/form-controls/CustomInput';
import CustomButton from '../../components/form-controls/CustomButton';
import { startSendPasswordResetEmail } from '../../redux/actions/auth';

const fieldNames = {
  email: 'email'
};

const schema = yup.object().shape({
  [fieldNames.email]: yup
    .string()
    .email('correo inválido')
    .required('campo requerido')
});

const ResetPassword = () => {
  const methods = useForm({
    resolver: yupResolver(schema)
  });

  const dispatch = useDispatch();
  const authUi = useSelector((state) => state.authUi);

  const onSubmit = ({ email }) => {
    if (!authUi.loading) {
      dispatch(startSendPasswordResetEmail(email));
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <h4 className="border-bottom pb-2">Recuperar contraseña</h4>
        <p className="small">
          Te enviaremos un link de recuperación al correo que ingreses
        </p>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="row g-3">
          <CustomInput
            name={fieldNames.email}
            placeholder="Ingresa tu correo"
          />

          <CustomButton
            type="submit"
            className="btn btn-primary text-white w-100"
            loading={authUi.loading}
          >
            Enviar link de recuperación
          </CustomButton>
        </form>
      </FormProvider>
      <div className="text-center small border-top mt-3 pt-2">
        <Link to="/auth/login">Volver a inicio de sesión</Link>
      </div>
    </>
  );
};

export default ResetPassword;
