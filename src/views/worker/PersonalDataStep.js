import { useEffect } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Select from 'react-select';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import clsx from 'clsx';
import { cities } from '../../utils/cities';

import {
  customSelectStyles,
  customErrorSelectStyles
} from '../../utils/selectStyles';
import { genders, personalIds } from '../../utils/enums';

import CustomInput from '../../components/form-controls/CustomInput';

const fieldNames = {
  gender: 'gender',
  typeOfId: 'typeOfId',
  personalId: 'personalId',
  city: 'city',
  address: 'address',
  dateOfBirth: 'dateOfBirth'
};

const schema = yup.object().shape({
  [fieldNames.gender]: yup.string().required('campo requerido'),
  [fieldNames.typeOfId]: yup.string().required('campo requerido'),
  [fieldNames.personalId]: yup
    .string()
    .required('campo requerido')
    .matches(/^[0-9]+$/, 'debe ser un número'),
  [fieldNames.city]: yup.string().required('campo requerido'),
  [fieldNames.address]: yup.string().required('campo requerido'),
  [fieldNames.dateOfBirth]: yup.date().required('campo requerido').nullable()
});

const PersonalDataStep = ({
  setStep,
  setFormData,
  formData,
  updateFormData
}) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [fieldNames.gender]: formData[fieldNames.gender],
      [fieldNames.typeOfId]: formData[fieldNames.typeOfId],
      [fieldNames.personalId]: formData[fieldNames.personalId],
      [fieldNames.city]: formData[fieldNames.city],
      [fieldNames.address]: formData[fieldNames.address],
      [fieldNames.dateOfBirth]: formData[fieldNames.dateOfBirth]
    }
  });

  const onSubmit = (data) => {
    setStep((step) => step + 1);
    setFormData({ ...formData, ...data });
  };

  useEffect(() => {
    registerLocale('es', es);
  }, []);

  return (
    <div className="fade-anim">
      <h4 className="mb-3">Datos personales</h4>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="row g-3">
          <div>
            <Controller
              name={fieldNames.gender}
              control={methods.control}
              render={({
                field: { onChange, value },
                fieldState: { error }
              }) => (
                <>
                  <Select
                    defaultValue={genders.find(
                      (gender) => gender.value === value
                    )}
                    selected={value}
                    isSearchable={false}
                    placeholder="Género"
                    styles={
                      error ? customErrorSelectStyles : customSelectStyles
                    }
                    getOptionValue={(option) => option.value}
                    options={genders}
                    onChange={(e) => {
                      // onChange's arg will send value into hook form
                      updateFormData(fieldNames.gender, e.value);
                      onChange(e.value);
                    }}
                  />
                  {error && (
                    <span className="text-danger small">{error.message}</span>
                  )}
                </>
              )}
            />
          </div>

          <div>
            <Controller
              name={fieldNames.typeOfId}
              control={methods.control}
              render={({
                field: { onChange, value },
                fieldState: { error }
              }) => (
                <>
                  <Select
                    defaultValue={personalIds.find((id) => id.value === value)}
                    isSearchable={false}
                    placeholder="Tipo de identificación"
                    styles={
                      error ? customErrorSelectStyles : customSelectStyles
                    }
                    getOptionValue={(option) => option.value}
                    options={personalIds}
                    onChange={(e) => {
                      onChange(e.value);
                      updateFormData(fieldNames.typeOfId, e.value);
                    }}
                  />
                  {error && (
                    <span className="text-danger small">{error.message}</span>
                  )}
                </>
              )}
            />
          </div>

          <CustomInput
            name={fieldNames.personalId}
            placeholder="Número de identificación"
          />

          <div>
            <Controller
              render={({
                field: { onChange, value },
                fieldState: { error }
              }) => (
                <>
                  <Select
                    defaultValue={cities.find((city) => city.value === value)}
                    placeholder="Ciudad"
                    styles={
                      error ? customErrorSelectStyles : customSelectStyles
                    }
                    getOptionValue={(option) => option.value}
                    options={cities}
                    onChange={(e) => {
                      onChange(e.value);
                      updateFormData(fieldNames.city, e.value);
                    }}
                  />
                  {error && (
                    <span className="text-danger small">{error.message}</span>
                  )}
                </>
              )}
              name={fieldNames.city}
              control={methods.control}
            />
          </div>

          <CustomInput
            name={fieldNames.address}
            placeholder="Dirección del servicio"
          />

          <div>
            <Controller
              name={fieldNames.dateOfBirth}
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <DatePicker
                    {...field}
                    placeholderText="Fecha de nacimiento"
                    className={clsx('form-control', error && 'is-invalid')}
                    isClearable
                    selected={field.value}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    scrollableYearDropdown
                    locale="es"
                    control={methods.control}
                  />
                  {error && (
                    <span className="text-danger small">{error.message}</span>
                  )}
                </>
              )}
            />
          </div>

          <div>
            <button className="btn btn-primary text-white w-100" type="submit">
              Siguiente
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default PersonalDataStep;
