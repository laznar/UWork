import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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
import tasks from '../../utils/tasks';
import { cities } from '../../utils/cities';
import CustomTextarea from '../../components/form-controls/CustomTextarea';
import {
  customSelectStyles,
  customErrorSelectStyles
} from '../../utils/selectStyles';
import { genders, personalIds, transports } from '../../utils/enums';
import { workerRegisterSchema, workerUpdateSchema } from '../../utils/schemas';

const Edit = () => {
  const [pictures, setPictures] = useState([]);
  const [startDate, setStartDate] = useState(null);

  const authUi = useSelector((state) => state.authUi);
  const auth = useSelector((state) => state.auth);

  const fieldNames = {
    name: 'name',
    surname: 'surname',
    email: 'email',
    gender: 'gender',
    typeOfId: 'typeOfId',
    personalId: 'personalId',
    city: 'city',
    address: 'address',
    dateOfBirth: 'dateOfBirth',
    phoneNumber: 'phoneNumber',
    transport: 'transport',
    skills: 'skills',
    aboutMe: 'aboutMe',
    photoUrl: 'photoUrl'
  };

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
        paddingTop: 30,
        maxWidth: 550
      }}
      className="mx-auto container"
    >
      <Card>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="row g-3">
            <>
              <CustomInput name={fieldNames.name} placeholder="Nombres" />

              <CustomInput name={fieldNames.surname} placeholder="Apellidos" />

              <CustomInput
                name={fieldNames.email}
                placeholder="Ingresa tu correo"
              />
            </>

            <div>
              <Controller
                name={fieldNames.gender}
                render={({ field, formState: { errors } }) => (
                  <>
                    <Select
                      {...field}
                      options={genders}
                      isSearchable={false}
                      placeholder="Género"
                      styles={
                        errors[fieldNames.gender]
                          ? customErrorSelectStyles
                          : customSelectStyles
                      }
                    />
                    {errors[fieldNames.gender] && (
                      <span className="text-danger small">
                        {errors[fieldNames.gender].message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>

            <div>
              <Controller
                name={fieldNames.typeOfId}
                render={({ field, formState: { errors } }) => (
                  <>
                    <Select
                      {...field}
                      options={personalIds}
                      isSearchable={false}
                      placeholder="Tipo de identificación"
                      styles={
                        errors[fieldNames.typeOfId]
                          ? customErrorSelectStyles
                          : customSelectStyles
                      }
                    />
                    {errors[fieldNames.typeOfId] && (
                      <span className="text-danger small">
                        {errors[fieldNames.typeOfId].message}
                      </span>
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
                name={fieldNames.city}
                render={({ field, formState: { errors } }) => (
                  <>
                    <Select
                      {...field}
                      options={cities}
                      isSearchable={true}
                      placeholder="Ciudad"
                      styles={
                        errors[fieldNames.city]
                          ? customErrorSelectStyles
                          : customSelectStyles
                      }
                    />
                    {errors[fieldNames.city] && (
                      <span className="text-danger small">
                        {errors[fieldNames.city].message}
                      </span>
                    )}
                  </>
                )}
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
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                onChange={(date) => {
                  setStartDate(date);
                }}
                scrollableYearDropdown
                locale="es"
              />
            </div>

            <CustomInput
              name={fieldNames.phoneNumber}
              placeholder="Ingresa celular"
            />

            <div>
              <Controller
                name={fieldNames.transport}
                render={({ field, formState: { errors } }) => (
                  <>
                    <Select
                      {...field}
                      options={transports}
                      isSearchable={false}
                      placeholder="Medio de transporte"
                      styles={
                        errors[fieldNames.transport]
                          ? customErrorSelectStyles
                          : customSelectStyles
                      }
                    />
                    {errors[fieldNames.transport] && (
                      <span className="text-danger small">
                        {errors[fieldNames.transport].message}
                      </span>
                    )}
                  </>
                )}
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

export default Edit;
