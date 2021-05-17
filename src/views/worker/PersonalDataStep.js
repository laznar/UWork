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
              render={({
                field: { onChange, value },
                formState: { errors }
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
                      errors[fieldNames.gender]
                        ? customErrorSelectStyles
                        : customSelectStyles
                    }
                    getOptionValue={(option) => option.value}
                    options={genders}
                    onChange={(e) => {
                      // onChange's arg will send value into hook form
                      updateFormData(fieldNames.gender, e.value);
                      onChange(e.value);
                    }}
                  />
                  {errors[fieldNames.gender] && (
                    <span className="text-danger small">
                      {errors[fieldNames.gender].message}
                    </span>
                  )}
                </>
              )}
              name={fieldNames.gender}
              control={methods.control}
            />
          </div>

          <div>
            <Controller
              render={({
                field: { onChange, value },
                formState: { errors }
              }) => (
                <>
                  <Select
                    defaultValue={personalIds.find((id) => id.value === value)}
                    isSearchable={false}
                    placeholder="Tipo de identificación"
                    styles={
                      errors[fieldNames.typeOfId]
                        ? customErrorSelectStyles
                        : customSelectStyles
                    }
                    getOptionValue={(option) => option.value}
                    options={personalIds}
                    onChange={(e) => {
                      onChange(e.value);
                      updateFormData(fieldNames.typeOfId, e.value);
                    }}
                  />
                  {errors[fieldNames.typeOfId] && (
                    <span className="text-danger small">
                      {errors[fieldNames.typeOfId].message}
                    </span>
                  )}
                </>
              )}
              name={fieldNames.typeOfId}
              control={methods.control}
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
                formState: { errors }
              }) => (
                <>
                  <Select
                    defaultValue={cities.find((city) => city.value === value)}
                    placeholder="Ciudad"
                    styles={
                      errors[fieldNames.city]
                        ? customErrorSelectStyles
                        : customSelectStyles
                    }
                    getOptionValue={(option) => option.value}
                    options={cities}
                    onChange={(e) => {
                      onChange(e.value);
                      updateFormData(fieldNames.city, e.value);
                    }}
                  />
                  {errors[fieldNames.city] && (
                    <span className="text-danger small">
                      {errors[fieldNames.city].message}
                    </span>
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
              render={({ field, formState: { errors } }) => (
                <>
                  <DatePicker
                    {...field}
                    placeholderText="Fecha de nacimiento"
                    className={clsx(
                      'form-control',
                      errors[fieldNames.dateOfBirth] && 'is-invalid'
                    )}
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
                  {errors[fieldNames.dateOfBirth] && (
                    <span className="text-danger small">
                      {errors[fieldNames.dateOfBirth].message}
                    </span>
                  )}
                </>
              )}
              name={fieldNames.dateOfBirth}
              control={methods.control}
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
