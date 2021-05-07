import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronRightIcon } from '@heroicons/react/outline';
import CustomInput from '../../components/form-controls/CustomInput';
import Card from '../../components/cards/Card';
import Previews from '../../components/Previews';
import Ratings from '../../components/Ratings';
import ProfilePhoto from '../../components/ProfilePhoto';
import { Link } from 'react-router-dom';
import { startLogout } from '../../redux/actions/auth';

const fieldNames = {
  nombre: 'nombre',
  email: 'email',
  direccion: 'direccion',
  ciudad: 'ciudad',
  telefono: 'telefono',
  celular: 'celular'
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
  [fieldNames.telefono]: yup
    .string()
    .test('len', '+(área) número 7 dígitos', (val) => val.length === 9)
    .required('+(área) número'),
  [fieldNames.celular]: yup
    .string()
    .matches(/^\d+$/)
    .test('len', 'celular de 10 dígitos', (val) => val.length === 10)
    .required('Celular 10 dígitos')
    .max(10, '10 dígitos')
    .min(10, '10 dígitos')
});

const Profile = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  });

  const dispatch = useDispatch();

  const authUi = useSelector((state) => state.authUi);

  const auth = useSelector((state) => state.auth);

  const onSubmit = ({ email, password }) => {
    if (!authUi.loading) {
      //dispatch(startLoginWithEmailPassword(email, password));
    }
  };

  return (
    <div className="fade-anim">
      <h1>Perfil</h1>

      <div className="d-flex flex-md-row flex-column flex-grow-1">
        <div
          style={{ minWidth: 290 }}
          className="border rounded shadow-sm p-4 bg-white d-flex flex-column align-items-center"
        >
          <ProfilePhoto
            height={124}
            width={124}
            displayName={auth.name}
            photoURL={auth.photoURL}
            className="mb-3"
          />
          <strong>{auth.name}</strong>
          <span className="text-muted">{auth.email}</span>
        </div>

        <div className="ms-md-3 mt-3 mt-md-0 flex-grow-1">
          <div className="list-group mb-3 shadow-sm">
            <Link className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
              Editar información <ChevronRightIcon width={20} height={20} />
            </Link>
            <Link
              to="/profile/password"
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
              Cambiar contraseña <ChevronRightIcon width={20} height={20} />
            </Link>
          </div>
          <div className="list-group shadow-sm">
            <button
              onClick={() => dispatch(startLogout())}
              className="list-group-item list-group-item-action"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      <FormProvider {...methods}>
        <Card>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="row g-3">
            <CustomInput
              name={fieldNames.nombre}
              label="Nombre"
              placeholder="Nombre completo"
            />
            <CustomInput
              name={fieldNames.email}
              label="Correo"
              placeholder="Ingresa tu correo"
            />
            <CustomInput
              name={fieldNames.ciudad}
              label="Ciudad"
              placeholder="Ingrese ciudad"
            />
            <CustomInput
              name={fieldNames.direccion}
              label="Direccion"
              placeholder="Ingrese dirección del servicio"
            />
            <CustomInput
              name={fieldNames.telefono}
              label="Teléfono fijo"
              placeholder="Ingrese teléfono fijo"
            />
            <CustomInput
              name={fieldNames.celular}
              label="Número celular"
              placeholder="Ingresa celular"
            />
          </form>
        </Card>
      </FormProvider>
      <Card>
        <h5>Fotos de trabajo</h5>
        <Previews />
      </Card>
      <Card>
        <h5>Reviews</h5>
        <Ratings />
      </Card>
    </div>
  );
};

export default Profile;
