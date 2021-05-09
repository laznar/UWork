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

  return (
    <div className="fade-anim">
      <h2 className="mb-3">Crear cuenta</h2>
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
