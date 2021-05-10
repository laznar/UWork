import { useState, useRef, useLayoutEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Card from '../../components/cards/Card';
import { useSelector } from 'react-redux';
import CustomInput from '../../components/form-controls/CustomInput';
import Select from 'react-select';
import SelectCiudad from '../../components/SelectCiudad';
import DatePicker from 'react-date-picker';
import autosize from 'autosize';
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import ImageUploader from 'react-images-upload';
import tasks from '../../utils/tasksUtils';

const fieldNames = {
  nombres: 'nombres',
  apellidos: 'apellidos',
  genero: 'genero',
  email: 'email',
  cedula: 'cedula',
  password: 'password',
  confirmpass: 'confirmpass',
  ciudad: 'ciudad',
  direccion: 'direccion',
  fechaNacimiento: 'fechaNacimiento',
  celular: 'celular',
  medioTransporte: 'medioTransporte',
  aboutMe: 'aboutMe',
  foto: 'foto',
  habilidad: 'habilidad'
};

const genero = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Femenino' },
  { value: 'O', label: 'Otro' }
];

const transporte = [
  { value: 'Público', label: 'Público' },
  { value: 'Bicicleta', label: 'Bicicleta' },
  { value: 'Moto', label: 'Moto' },
  { value: 'Carro', label: 'Carro' }
];

const identificacion = [
  { value: 'CC', label: 'Cédula de Ciudadanía' },
  { value: 'CE', label: 'Cédula de Extranjería' },
  { value: 'PA', label: 'Pasaporte' },
  { value: 'TI', label: 'Tarjeta de Identidad' }
];

const schema = yup.object().shape({
  [fieldNames.email]: yup
    .string()
    .email('correo inválido')
    .required('campo requerido'),
  [fieldNames.password]: yup
    .string()
    .required('campo requerido')
    .min(6, 'mínimo 6 caracteres'),
  [fieldNames.celular]: yup
    .string()
    .matches(/^\d+$/)
    .test('len', 'celular de 10 dígitos', (val) => val.length === 10)
    .required('Celular 10 dígitos')
    .max(10, '10 dígitos')
    .min(10, '10 dígitos')
});

const Worker = () => {
  const methods = useForm({
    resolver: yupResolver(schema)
  });

  const aboutMe = useRef(null);

  useLayoutEffect(() => {
    autosize(aboutMe.current);
  }, []);

  const authUi = useSelector((state) => state.authUi);
  const auth = useSelector((state) => state.auth);

  const onSubmit = ({ email, password }) => {
    if (!authUi.loading) {
      //dispatch(startLoginWithEmailPassword(email, password));
    }
  };

  const [pictures, setPictures] = useState([]);

  const onDrop = (picture) => {
    setPictures([...pictures, picture]);
  };

  const [value, onChange] = useState(new Date());
  return (
    <div
      style={{
        paddingTop: 100,
        paddingBottom: 100,
        maxWidth: 550,
        width: '90%'
      }}
      className="mx-auto container"
    >
      <h2>Ser un Worker</h2>
      <FormProvider {...methods}>
        <Card>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="row g-3">
            {!auth.uid && (
              <>
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
              </>
            )}
            <div>
              <Select
                options={genero}
                isSearchable={false}
                placeholder="Género"
              />
            </div>

            {!auth.uid && (
              <CustomInput
                name={fieldNames.email}
                label="Correo"
                placeholder="Ingresa tu correo"
              />
            )}

            <div>
              <Select
                options={identificacion}
                isSearchable={false}
                placeholder="Tipo de identificación"
              />
            </div>

            <CustomInput
              name={fieldNames.cedula}
              label="Cédula"
              placeholder="Número de identificación"
            />

            {!auth.uid && (
              <>
                <CustomInput
                  name={fieldNames.password}
                  label="Contraseña"
                  type="password"
                  placeholder="Ingrese contraseña"
                />
                <CustomInput
                  name={fieldNames.confirmpass}
                  label="Confirmar contraseña"
                  type="password"
                  placeholder="Confirme contraseña"
                />
              </>
            )}
            <SelectCiudad />
            <CustomInput
              name={fieldNames.direccion}
              label="Direccion"
              placeholder="Dirección del servicio"
            />
            <div>
              <label htmlFor="select" className="form-label mb-1 custom-label">
                <strong>Fecha de Nacimiento</strong>
              </label>
              <div>
                <DatePicker onChange={onChange} value={value} />
              </div>
            </div>
            <CustomInput
              name={fieldNames.celular}
              label="Número celular"
              placeholder="Ingresa celular"
            />
            <div>
              <Select
                options={transporte}
                isSearchable={false}
                placeholder="Medio de transporte"
              />
            </div>
            <div>
              <textarea
                name={fieldNames.aboutMe}
                ref={aboutMe}
                label="Acerca de mi"
                placeholder="Acerca de mi"
                className="form-control"
              ></textarea>
            </div>
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
          buttonStyles={{ backgroundColor: '#45a8d8' }}
        />
      </Card>
      <Card>
        <div>
          <h5>Registra habilidades</h5>
          <Select options={tasks} isMulti placeholder="Añadir habilidades" />
        </div>
      </Card>
    </div>
  );
};

export default Worker;
