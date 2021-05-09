import { useRef, useLayoutEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Card from '../../components/cards/Card';
import { useSelector } from 'react-redux';
import CustomInput from '../../components/form-controls/CustomInput';
import Previews from '../../components/Previews';
import TaskSearch from '../../components/TaskSearch/TaskSearch';
import Select from 'react-select';
import SelectCiudad from '../../components/SelectCiudad';
import { useState } from 'react';
import DatePicker from 'react-date-picker';
import autosize from 'autosize';
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';

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
  { value: 'Público', label: 'Publico' },
  { value: 'Bicicleta', label: 'Bicicleta' },
  { value: 'Moto', label: 'Moto' },
  { value: 'Carro', label: 'Carro' }
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

const WorkerInitial = () => {
  const methods = useForm({
    resolver: yupResolver(schema)
  });

  const aboutMe = useRef(null);

  useLayoutEffect(() => {
    autosize(aboutMe.current);
  }, []);

  const authUi = useSelector((state) => state.authUi);

  const onSubmit = ({ email, password }) => {
    if (!authUi.loading) {
      //dispatch(startLoginWithEmailPassword(email, password));
    }
  };

  const [value, onChange] = useState(new Date());
  return (
    <div>
      <h1>Módulo de ser un Worker</h1>
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
            <div>
              <Select
                options={genero}
                isSearchable={false}
                placeholder="Selecciona un género"
              />
            </div>
            <CustomInput
              name={fieldNames.email}
              label="Correo"
              placeholder="Ingresa tu correo"
            />
            <CustomInput
              name={fieldNames.cedula}
              label="Cédula"
              placeholder="Ingresa tu cédula"
            />
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
            <SelectCiudad />
            <CustomInput
              name={fieldNames.direccion}
              label="Direccion"
              placeholder="Ingrese dirección del servicio"
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
                placeholder="Selecciona medio de transporte"
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
        <h5>Fotos de Perfil</h5>
        <Previews />
      </Card>
      <Card>
        <h5>Registra habilidades</h5>
        <TaskSearch />
      </Card>
    </div>
  );
};

export default WorkerInitial;
