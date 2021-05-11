import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Card from '../../components/cards/Card';
import { useSelector } from 'react-redux';
import CustomInput from '../../components/form-controls/CustomInput';
import CustomButton from '../../components/form-controls/CustomButton';
import Select from 'react-select';
import autosize from 'autosize';
import ImageUploader from 'react-images-upload';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import tasks from '../../utils/tasksUtils';
import { cities } from '../../utils/cities';

const fieldNames = {
  name: 'surname',
  surname: 'surname',
  gender: 'gender',
  email: 'email',
  personalId: 'personalId',
  password: 'password',
  confirm: 'confirm',
  city: 'city',
  address: 'address',
  dateOfBirth: 'dateOfBirth',
  phoneNumber: 'phoneNumber',
  transport: 'transport',
  aboutMe: 'aboutMe',
  photo: 'photo',
  skills: 'skills'
};

const genders = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Femenino' },
  { value: 'O', label: 'Otro' }
];

const transports = [
  { value: 'Público', label: 'Público' },
  { value: 'Bicicleta', label: 'Bicicleta' },
  { value: 'Moto', label: 'Moto' },
  { value: 'Carro', label: 'Carro' }
];

const personalIds = [
  { value: 'CC', label: 'Cédula de Ciudadanía' },
  { value: 'CE', label: 'Cédula de Extranjería' },
  { value: 'PA', label: 'Pasaporte' },
  { value: 'TI', label: 'Tarjeta de Identidad' }
];

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
    .oneOf([yup.ref(fieldNames.password)], 'las contraseñas deben coincidir'),
  [fieldNames.personalId]: yup
    .number()
    .required('campo requerido')
    .typeError('debe ser un número')
    .positive('debe ser un número positivo')
    .integer('debe ser un número entero'),
  [fieldNames.phoneNumber]: yup
    .number()
    .required('campo requerido')
    .typeError('debe ser un número')
    .positive('debe ser un número positivo')
    .integer('debe ser un número entero')
    .test(
      'len',
      'el celular debe ser de 10 dígitos',
      (val) => val.length === 10
    )
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

  const onSubmit = (data) => {
    if (!authUi.loading) {
      // dispatch(startLoginWithEmailPassword(email, password));
      console.log(data);
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

      <Card>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="row g-3">
            {!auth.uid && (
              <>
                <CustomInput name={fieldNames.name} placeholder="Nombres" />
                <CustomInput
                  name={fieldNames.surname}
                  placeholder="Apellidos"
                />
                <CustomInput
                  name={fieldNames.email}
                  placeholder="Ingresa tu correo"
                />

                <CustomInput
                  name={fieldNames.password}
                  type="password"
                  placeholder="Ingrese contraseña"
                />
                <CustomInput
                  name={fieldNames.confirm}
                  type="password"
                  placeholder="Confirma tu contraseña"
                />
              </>
            )}

            <div>
              <Select
                options={genders}
                isSearchable={false}
                placeholder="Género"
                styles={customSelectStyles}
              />
            </div>

            <div>
              <Select
                options={personalIds}
                isSearchable={false}
                placeholder="Tipo de identificación"
                styles={customSelectStyles}
              />
            </div>

            <CustomInput
              name={fieldNames.personalId}
              placeholder="Número de identificación"
            />

            <div>
              <Select
                options={cities}
                placeholder="Seleccione ciudad"
                styles={customSelectStyles}
              />
            </div>

            <CustomInput
              name={fieldNames.address}
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
              name={fieldNames.phoneNumber}
              placeholder="Ingresa celular"
            />

            <div>
              <Select
                options={transports}
                isSearchable={false}
                placeholder="Medio de transporte"
                styles={customSelectStyles}
              />
            </div>

            <div>
              <textarea
                name={fieldNames.aboutMe}
                ref={aboutMe}
                placeholder="Acerca de mi"
                className="form-control"
              ></textarea>
            </div>
            <CustomButton
              className="btn btn-primary text-white w-100"
              type="submit"
            >
              Guardar
            </CustomButton>
          </form>
        </FormProvider>
      </Card>

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
