import { Link } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import CustomInput from '../../components/form-controls/CustomInput';
import CustomButton from '../../components/form-controls/CustomButton';

import { startRegisterWithEmailPassword } from '../../redux/actions/auth';

const fieldNames = {
  name: 'name',
  email: 'email',
  password: 'password',
};

const schema = yup.object().shape({
  [fieldNames.name]: yup.string().required('campo requerido'),
  [fieldNames.email]: yup
    .string()
    .email('correo inválido')
    .required('campo requerido'),
  [fieldNames.password]: yup
    .string()
    .required('campo requerido')
    .min(6, 'mínimo 6 caracteres'),
});

const SignUp = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const authUi = useSelector((state) => state.authUi);

  const onSubmit = ({ email, password, name }) => {
    if (!authUi.loading) {
      dispatch(startRegisterWithEmailPassword(email, password, name));
    }
  };

  return (
    <div className="fade-anim">
      <h2 className="mb-3">Crear cuenta</h2>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="row g-3">
          <CustomInput
            name={fieldNames.name}
            label="Nombre"
            placeholder="Ingresa tu nombre completo"
          />
          <CustomInput
            name={fieldNames.email}
            label="Correo"
            placeholder="Ingresa tu correo"
          />
          <CustomInput
            name={fieldNames.password}
            type="password"
            label="Contraseña"
            placeholder="Mínimo 6 caracteres"
          />
          <CustomButton
            loading={authUi.loading}
            type="submit"
            className="btn btn-primary text-white w-100"
          >
            Crear cuenta
          </CustomButton>
          <p className="text-center small">
            Ya tienes una cuenta? <Link to="/auth/login">Inicia sesión</Link>
          </p>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignUp;
