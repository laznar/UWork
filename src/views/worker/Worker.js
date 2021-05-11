import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Card from '../../components/cards/Card';
import { useSelector } from 'react-redux';
import CustomInput from '../../components/form-controls/CustomInput';
import Select from 'react-select';
import autosize from 'autosize';
import ImageUploader from 'react-images-upload';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import tasks from '../../utils/tasksUtils';
import { cities } from '../../utils/cities';

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

const customSelectStyles = {
  option: (provided, state) => ({
    ...provided
  }),
  control: (provided, state) => ({
    ...provided,
    boxShadow: state.isFocused ? '0 0 0 0.25rem rgb(69 168 216 / 25%)' : 'none',
    borderColor: state.isFocused ? '#a2d4ec' : '#ced4da',

    '&:hover': {
      borderColor: undefined
    }
  })
};

const Worker = () => {
  const [pictures, setPictures] = useState([]);
  const [startDate, setStartDate] = useState(null);

  const methods = useForm({
    resolver: yupResolver(schema)
  });

  const aboutMe = useRef(null);

  useLayoutEffect(() => {
    autosize(aboutMe.current);
  }, []);

  useEffect(() => {
    registerLocale('es', es);
  }, []);

  const authUi = useSelector((state) => state.authUi);
  const auth = useSelector((state) => state.auth);

  const onSubmit = ({ email, password }) => {
    if (!authUi.loading) {
      //dispatch(startLoginWithEmailPassword(email, password));
    }
  };

  const onDrop = (picture) => {
    setPictures([...pictures, picture]);
  };

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
                styles={customSelectStyles}
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
                styles={customSelectStyles}
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

            <div>
              <Select
                options={cities}
                placeholder="Seleccione ciudad"
                styles={customSelectStyles}
              />
            </div>

            <CustomInput
              name={fieldNames.direccion}
              label="Direccion"
              placeholder="Dirección del servicio"
            />

            <div>
              <DatePicker
                placeholderText="Fecha de nacimiento"
                className="form-control"
                selected={startDate}
                isClearable
                onChange={(date) => {
                  setStartDate(date);
                }}
                showYearDropdown
                scrollableYearDropdown
                locale="es"
              />
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
                styles={customSelectStyles}
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
          <Select
            styles={customSelectStyles}
            options={tasks}
            isMulti
            placeholder="Añadir habilidades"
          />
        </div>
      </Card>
    </div>
  );
};

export default Worker;
