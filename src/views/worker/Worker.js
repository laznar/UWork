import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import autosize from 'autosize';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import ImageUploader from 'react-images-upload';

import Card from '../../components/cards/Card';
import CustomInput from '../../components/form-controls/CustomInput';
import CustomButton from '../../components/form-controls/CustomButton';
import tasks from '../../utils/tasks';
import { cities } from '../../utils/cities';
import CustomTextarea from '../../components/form-controls/CustomTextarea';
import {
  customSelectStyles,
  customErrorSelectStyles
} from '../../utils/selectStyles';
import {
  workerRegisterFieldNames,
  workerUpdateFieldNames
} from '../../utils/fieldNames';
import { workerRegisterSchema, workerUpdateSchema } from '../../utils/schemas';
import { genders, personalIds, transports } from '../../utils/enums';
import { startRegisterWithEmailPassword } from '../../redux/actions/auth';

const Worker = () => {
  const [pictures, setPictures] = useState([]);

  const authUi = useSelector((state) => state.authUi);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const fieldNames = auth.uid
    ? workerUpdateFieldNames
    : workerRegisterFieldNames;

  const methods = useForm({
    resolver: yupResolver(auth.uid ? workerUpdateSchema : workerRegisterSchema)
  });

  const aboutMe = useRef(null);

  useLayoutEffect(() => {
    autosize(aboutMe.current);
  }, []);

  useEffect(() => {
    registerLocale('es', es);
  }, []);

  const onSubmit = (data) => {
    if (!authUi.loading) {
      dispatch(startRegisterWithEmailPassword(data, true));
      console.log(data);
    }
  };

  const onDrop = (picture) => {
    setPictures([...pictures, picture]);
  };

  return (
    <div
      style={{
        paddingTop: 30,
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
              <Controller
                render={({ field: { onChange }, formState: { errors } }) => (
                  <>
                    <Select
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
                render={({ field: { onChange }, formState: { errors } }) => (
                  <>
                    <Select
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
                render={({ field: { onChange }, formState: { errors } }) => (
                  <>
                    <Select
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

            <CustomInput
              name={fieldNames.phoneNumber}
              placeholder="Ingresa celular"
            />

            <div>
              <Controller
                render={({ field: { onChange }, formState: { errors } }) => (
                  <>
                    <Select
                      isSearchable={false}
                      placeholder="Medio de transporte"
                      styles={
                        errors[fieldNames.transport]
                          ? customErrorSelectStyles
                          : customSelectStyles
                      }
                      getOptionValue={(option) => option.value}
                      options={transports}
                      onChange={(e) => {
                        onChange(e.value);
                      }}
                    />
                    {errors[fieldNames.transport] && (
                      <span className="text-danger small">
                        {errors[fieldNames.transport].message}
                      </span>
                    )}
                  </>
                )}
                name={fieldNames.transport}
                control={methods.control}
              />
            </div>

            <div>
              <Select
                styles={customSelectStyles}
                options={tasks}
                isMulti
                placeholder="Añadir habilidades"
              />
            </div>

            <div>
              <CustomTextarea name={fieldNames.aboutMe} />
            </div>

            <h5>Foto de Perfil</h5>
            <ImageUploader
              withIcon={false}
              onChange={onDrop}
              imgExtension={['.jpg', '.gif', '.png', 'jpeg', '.svg']}
              label="Archivo máximo de 2,5 MB"
              maxFileSize={2621440}
              withPreview={true}
              singleImage={true}
              buttonText="Seleccionar foto"
              fileSizeError={'debe ser menor a 2,5MB'}
              fileContainerStyle={{ padding: 0, margin: 0, boxShadow: 'none' }}
              buttonStyles={{ backgroundColor: '#45a8d8' }}
            />
            <CustomButton
              className="btn btn-primary text-white w-100"
              type="submit"
            >
              Guardar
            </CustomButton>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
};

export default Worker;
