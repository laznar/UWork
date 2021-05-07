import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Card from '../../components/cards/Card';
import { useSelector } from 'react-redux';
import CustomInput from '../../components/form-controls/CustomInput';
import Previews from '../../components/Previews';
import Ratings from '../../components/Ratings';
const fieldNames = {
  nombres: 'nombres',
  apellidos: 'apellidos',
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

const Edit = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  });

  const authUi = useSelector((state) => state.authUi);

  const onSubmit = ({ email, password }) => {
    if (!authUi.loading) {
      //dispatch(startLoginWithEmailPassword(email, password));
    }
  };
  return (
    <div>
      <FormProvider {...methods}>
        <Card>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="row g-3">
            <CustomInput
              name={fieldNames.nombres}
              label="Nombres"
              placeholder="Nombres"
            />
            <CustomInput
              name={fieldNames.apellidos}
              label="Apellidos"
              placeholder="Apellidos"
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

export default Edit;
