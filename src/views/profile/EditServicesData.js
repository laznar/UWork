import { useState, useEffect, useMemo } from 'react';
import { useForm, FormProvider, useWatch, Controller } from 'react-hook-form';
import Select from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import CustomButton from '../../components/form-controls/CustomButton';
import { startEditUserInfo } from '../../redux/actions/auth';
import BackLink from '../../components/BackLink';

import { transports } from '../../utils/enums';
import {
  customSelectStyles,
  customErrorSelectStyles
} from '../../utils/selectStyles';
import tasks from '../../utils/tasks';

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

const EditServicesData = () => {
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const authUi = useSelector((state) => state.authUi);
  const auth = useSelector((state) => state.auth);

  const defaultValues = useMemo(
    () => ({
      [fieldNames.phoneNumber]: auth.userData.phoneNumber,
      [fieldNames.transport]: auth.userData.transport,
      [fieldNames.skills]: auth.userData.skills,
      [fieldNames.aboutMe]: auth.userData.aboutMe
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
      <BackLink to="/perfil">Atrás</BackLink>
      <h4 className="mb-3">Información de servicio</h4>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="row g-3">
          <div>
            <Controller
              name={fieldNames.phoneNumber}
              control={methods.control}
              render={({
                field: { onChange, value },
                fieldState: { error }
              }) => (
                <>
                  <input
                    placeholder="Ingresa celular"
                    defaultValue={value}
                    className={clsx('form-control', error && 'is-invalid')}
                    onChange={(e) => {
                      onChange(e.target.value);
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
              name={fieldNames.transport}
              control={methods.control}
              render={({
                field: { onChange, value },
                fieldState: { error }
              }) => (
                <>
                  <Select
                    defaultValue={transports.find(
                      (transport) => transport.value === value
                    )}
                    isSearchable={false}
                    placeholder="Medio de transporte"
                    styles={
                      error ? customErrorSelectStyles : customSelectStyles
                    }
                    getOptionValue={(option) => option.value}
                    options={transports}
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

          <div>
            <Controller
              render={({
                field: { onChange, value },
                fieldState: { error }
              }) => (
                <>
                  <Select
                    defaultValue={value?.map((task) =>
                      tasks.find((t) => t.value === task)
                    )}
                    placeholder="Añadir habilidades"
                    isMulti
                    styles={
                      error ? customErrorSelectStyles : customSelectStyles
                    }
                    getOptionValue={(option) => option.value}
                    options={tasks}
                    onChange={(e) => {
                      const values = e.map((op) => op.value);
                      onChange(values);
                    }}
                  />
                  {error && (
                    <span className="text-danger small">{error.message}</span>
                  )}
                </>
              )}
              name={fieldNames.skills}
              control={methods.control}
            />
          </div>

          <div>
            <Controller
              name={fieldNames.aboutMe}
              control={methods.control}
              render={({
                field: { onChange, value },
                fieldState: { error }
              }) => (
                <>
                  <textarea
                    defaultValue={value}
                    id="textarea"
                    placeholder="Acerca de ti"
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                    className={clsx('form-control', error && 'is-invalid')}
                  ></textarea>
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
            Guardar
          </CustomButton>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditServicesData;
