import { Link } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';

import {
  startLoginWithEmailPassword,
  startGoogleLogin,
} from '../../redux/actions/auth';
import google from '../../assets/img/google.svg';
import CustomInput from '../../components/CustomInput';

const fieldNames = {
  email: 'email',
  password: 'password',
};

const schema = yup.object().shape({
  [fieldNames.email]: yup
    .string()
    .email('correo inválido')
    .required('campo requerido'),
  [fieldNames.password]: yup
    .string()
    .required('campo requerido')
    .min(6, 'mínimo 6 caracteres'),
});

const LogIn = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit = ({ email, password }) => {
    dispatch(startLoginWithEmailPassword(email, password));
  };

  const handleGoogleLogIn = (e) => {
    e.preventDefault();
    dispatch(startGoogleLogin());
  };

  return (
    <div className="fade-anim">
      <h2 className="mb-3">Inicia sesión</h2>

      <div>
        <button
          onClick={handleGoogleLogIn}
          className="btn mb-2 btn-outline-light text-dark border flex align-items-center w-100"
        >
          <img src={google} height={20} width={20} alt="Google logo" />
          <span className="ms-2">Iniciar con Google</span>
        </button>
      </div>

      <div className="d-flex align-items-center">
        <hr className="flex-grow-1 bg-secondary" />
        <span className="mx-2 small text-muted">O inicia con tu correo</span>
        <hr className="flex-grow-1 bg-secondary" />
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="row g-3">
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

          <div>
            <button type="submit" className="btn btn-primary text-white w-100">
              Iniciar sesión
            </button>
          </div>

          <div className="text-center small">
            No tienes una cuenta? <Link to="/auth/register">Regístrate</Link>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default LogIn;
