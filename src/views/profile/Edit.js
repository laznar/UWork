import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Card from '../../components/cards/Card';
import { useSelector } from 'react-redux';
import CustomInput from '../../components/form-controls/CustomInput';
import Ratings from '../../components/Ratings';
import { useState } from 'react';
import ImageUploader from 'react-images-upload';
import SelectCiudad from '../../components/SelectCiudad';

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

  const [pictures, setPictures] = useState([]);

  const onDrop = (picture) => {
    setPictures([...pictures, picture]);
  };

  return (
    <div style={{ maxWidth: 550 }} className="mx-auto">
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
            <SelectCiudad />
            <CustomInput
              name={fieldNames.direccion}
              label="Direccion"
              placeholder="Dirección de domicilio"
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
        <h5>Foto de Perfil</h5>
        <ImageUploader
          withIcon={false}
          onChange={onDrop}
          imgExtension={[
            '.jpg',
            '.gif',
            '.png',
            '.heic',
            'tiff',
            '.tif',
            'jpeg',
            '.svg'
          ]}
          label="Archivo máximo de 2,5 MB"
          maxFileSize={2621440}
          withPreview={true}
          singleImage={true}
          buttonText="Seleccionar foto"
          fileSizeError={'debe ser menor a 2,5MB'}
          fileContainerStyle={{ padding: 0, margin: 0, boxShadow: 'none' }}
          buttonClassName="btn btn-primary"
          buttonStyles={{ backgroundColor: '#45a8d8' }}
        />
      </Card>
      <Card>
        <h5>Reviews</h5>
        <Ratings />
      </Card>
    </div>
  );
};

export default Edit;
