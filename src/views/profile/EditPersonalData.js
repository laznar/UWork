import { useState, useEffect, useMemo } from 'react';
import { useForm, FormProvider, useWatch, Controller } from 'react-hook-form';
import Select from 'react-select';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import CustomInput from '../../components/form-controls/CustomInput';
import CustomButton from '../../components/form-controls/CustomButton';
import { startEditUserInfo } from '../../redux/actions/auth';
import BackLink from '../../components/BackLink';

import { personalIds, genders } from '../../utils/enums';
import { cities } from '../../utils/cities';
import {
  customSelectStyles,
  customErrorSelectStyles
} from '../../utils/selectStyles';

registerLocale('es', es);

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

const EditPersonalData = () => {
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const authUi = useSelector((state) => state.authUi);
  const auth = useSelector((state) => state.auth);

  const defaultValues = useMemo(
    () => ({
      [fieldNames.gender]: auth.userData.gender,
      [fieldNames.typeOfId]: auth.userData.typeOfId,
      [fieldNames.personalId]: auth.userData.personalId,
      [fieldNames.city]: auth.userData.city,
      [fieldNames.address]: auth.userData.address,
      [fieldNames.dateOfBirth]:
        auth.userData.dateOfBirth instanceof Date
          ? auth.userData.dateOfBirth
          : auth.userData.dateOfBirth.toDate()
    }),
    [auth]
  );
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues
  });

  const formValues = useWatch({
    control: methods.control,
    defaultValue: defaultValues
  });

  useEffect(() => {
    if (_.isEqual(formValues, defaultValues)) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [defaultValues, formValues]);

  const onSubmit = (data) => {
    if (!authUi.loading && !disabled) {
      let newData = {};
      // * Get only new values
      Object.keys(data).forEach((key) => {
        if (data[key] !== defaultValues[key]) {
          newData = { ...newData, [key]: data[key] };
        }
      });
      dispatch(startEditUserInfo(newData));
    }
  };
  return (
    <div
      style={{ maxWidth: 500 }}
      className="mx-auto border fade-anim rounded-3 p-4 shadow-sm bg-white"
    >
      <BackLink to="/perfil">Ir a perfil</BackLink>
      <h4 className="mb-3">Información personal</h4>

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
                    dateFormat="dd/MM/yyyy"
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
                  />
                  {error && (
                    <span className="text-danger small">{error.message}</span>
                  )}
                </>
              )}
            />
          </div>

          <CustomButton
            disabled={disabled}
            loading={authUi.loading}
            type="submit"
            className="btn btn-primary text-white w-100"
          >
            Guardar cambios
          </CustomButton>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditPersonalData;
