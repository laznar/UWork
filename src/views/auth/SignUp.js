import { Link } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import CustomInput from '../../components/form-controls/CustomInput';
import CustomButton from '../../components/form-controls/CustomButton';

import { startRegisterWithEmailPassword } from '../../redux/actions/auth';

import google from '../../assets/img/google.svg';
import { startGoogleLogin } from '../../redux/actions/auth';

const fieldNames = {
  name: 'name',
  surname: 'surname',
  email: 'email',
  password: 'password',
  confirm: 'confirm'
};

const schema = yup.object().shape({
  [fieldNames.name]: yup.string().required('campo requerido'),
  [fieldNames.surname]: yup.string().required('campo requerido'),
  [fieldNames.email]: yup
    .string()
    .email('correo inválido')
    .required('campo requerido'),
  [fieldNames.password]: yup
    .string()
    .required('campo requerido')
    .min(6, 'mínimo 6 caracteres'),
  [fieldNames.confirm]: yup
    .string()
    .required('campo requerido')
    .min(6, 'mínimo 6 caracteres')
    .oneOf([yup.ref(fieldNames.password)], 'las contraseñas deben coincidir')
});

const SignUp = () => {
  const methods = useForm({
    resolver: yupResolver(schema)
  });

  const dispatch = useDispatch();
  const authUi = useSelector((state) => state.authUi);

  const onSubmit = ({ email, password, name, surname }) => {
    if (!authUi.loading) {
      dispatch(startRegisterWithEmailPassword(email, password, name, surname));
    }
  };

  const handleGoogleLogIn = () => {
    if (!authUi.loading) {
      dispatch(startGoogleLogin());
    }
  };

  return (
    <div className="fade-anim">
      <h2 className="mb-3">Crear cuenta</h2>

      <button
        disabled={authUi.loading}
        onClick={handleGoogleLogIn}
        className="btn mb-2 btn-outline-light text-dark border flex align-items-center w-100"
      >
        <img src={google} height={20} width={20} alt="Google logo" />
        <span className="ms-2">Registrarse con Google</span>
      </button>

      <div className="d-flex align-items-center mb-2">
        <hr className="flex-grow-1 bg-secondary" />
        <span className="mx-2 small text-muted">
          O regístrate con tu correo
        </span>
        <hr className="flex-grow-1 bg-secondary" />
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="row g-3">
          <CustomInput name={fieldNames.name} placeholder="Nombre" />
          <CustomInput name={fieldNames.surname} placeholder="Apellidos" />
          <CustomInput name={fieldNames.email} placeholder="Correo" />
          <CustomInput
            name={fieldNames.password}
            type="password"
            placeholder="Ingresa tu contraseña"
          />
          <CustomInput
            name={fieldNames.confirm}
            type="password"
            placeholder="Confirma la contraseña"
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
