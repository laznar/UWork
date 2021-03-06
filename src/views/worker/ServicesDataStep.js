import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Select from 'react-select';
import clsx from 'clsx';
import autosize from 'autosize';

import {
  customSelectStyles,
  customErrorSelectStyles
} from '../../utils/selectStyles';
import { transports } from '../../utils/enums';
import tasks from '../../utils/tasks';
import BackButton from '../../components/BackButton';

const fieldNames = {
  phoneNumber: 'phoneNumber',
  transport: 'transport',
  skills: 'skills',
  aboutMe: 'aboutMe'
};

const schema = yup.object().shape({
  [fieldNames.phoneNumber]: yup
    .string()
    .required('campo requerido')
    .matches(/^[0-9]+$/, 'debe ser un número')
    .test(
      'len',
      'el celular debe ser de 10 dígitos',
      (val) => val.length === 10
    ),
  [fieldNames.transport]: yup.string().required('campo requerido'),
  [fieldNames.skills]: yup
    .array()
    .test({
      message: 'Debes escoger al menos una habilidad',
      test: (arr) => arr?.length >= 1
    })
    .required('campo requerido'),
  [fieldNames.aboutMe]: yup.string().required('campo requerido')
});

const ServicesDataStep = ({
  setStep,
  setFormData,
  formData,
  updateFormData
}) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [fieldNames.phoneNumber]: formData[fieldNames.phoneNumber] || '',
      [fieldNames.transport]: formData[fieldNames.transport],
      [fieldNames.skills]: formData[fieldNames.skills],
      [fieldNames.aboutMe]: formData[fieldNames.aboutMe] || ''
    }
  });

  useEffect(() => {
    autosize(document.getElementById('textarea'));
  }, []);

  const onSubmit = (data) => {
    setStep((step) => step + 1);
    setFormData({ ...formData, ...data });
  };

  return (
    <div className="fade-anim">
      <BackButton onClick={() => setStep((step) => step - 1)}>Atrás</BackButton>

      <h4 className="mb-3">Datos de servicio</h4>

      <form onSubmit={methods.handleSubmit(onSubmit)} className="row g-3">
        <Controller
          name={fieldNames.phoneNumber}
          control={methods.control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <input
                placeholder="Ingresa celular"
                defaultValue={value}
                className={clsx('form-control', error && 'is-invalid')}
                onChange={(e) => {
                  onChange(e.target.value);
                  updateFormData(fieldNames.phoneNumber, e.target.value);
                }}
              />
              {error && (
                <span className="text-danger small">{error.message}</span>
              )}
            </div>
          )}
        />

        <Controller
          name={fieldNames.transport}
          control={methods.control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <Select
                defaultValue={transports.find(
                  (transport) => transport.value === value
                )}
                isSearchable={false}
                placeholder="Medio de transporte"
                styles={error ? customErrorSelectStyles : customSelectStyles}
                getOptionValue={(option) => option.value}
                options={transports}
                onChange={(e) => {
                  onChange(e.value);
                  updateFormData(fieldNames.transport, e.value);
                }}
              />
              {error && (
                <span className="text-danger small">{error.message}</span>
              )}
            </div>
          )}
        />

        <Controller
          name={fieldNames.skills}
          control={methods.control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <Select
                defaultValue={value?.map((task) =>
                  tasks.find((t) => t.value === task)
                )}
                placeholder="Añadir habilidades"
                isMulti
                styles={error ? customErrorSelectStyles : customSelectStyles}
                getOptionValue={(option) => option.value}
                options={tasks}
                onChange={(e) => {
                  const values = e.map((op) => op.value);
                  onChange(values);
                  updateFormData(fieldNames.skills, values);
                }}
              />
              {error && (
                <span className="text-danger small">{error.message}</span>
              )}
            </div>
          )}
        />

        <Controller
          name={fieldNames.aboutMe}
          control={methods.control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <textarea
                defaultValue={value}
                id="textarea"
                placeholder="Acerca de ti"
                onChange={(e) => {
                  onChange(e.target.value);
                  updateFormData(fieldNames.aboutMe, e.target.value);
                }}
                className={clsx('form-control', error && 'is-invalid')}
              ></textarea>
              {error && (
                <span className="text-danger small">{error.message}</span>
              )}
            </div>
          )}
        />

        <div>
          <button type="submit" className="btn btn-primary text-white w-100">
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServicesDataStep;
