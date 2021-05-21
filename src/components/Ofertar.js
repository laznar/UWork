import { FormProvider, useForm, Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

import * as yup from 'yup';

import CustomInput from './form-controls/CustomInput';
import CustomTextarea from './form-controls/CustomTextarea';
import CustomButton from './form-controls/CustomButton';

import {
  customSelectStyles,
  customErrorSelectStyles
} from '../utils/selectStyles';
import { cities } from '../utils/cities';

registerLocale('es', es);

const fieldNames = {
  title: 'title',
  price: 'price',
  date: 'date',
  city: 'city',
  neighborhood: 'neighborhood',
  description: 'description'
};

const schema = yup.object().shape({
  [fieldNames.title]: yup.string().required('campo requerido'),
  [fieldNames.price]: yup.string().required('campo requerido'),
  [fieldNames.date]: yup.date().required('campo requerido').nullable(),
  [fieldNames.city]: yup.string().required('campo requerido'),
  [fieldNames.description]: yup.string().required('campo requerido')
});

const MAX_LENGTH = 8;
const MAX_VAL = 10000000;
const withValueLimit = (inputObj) => {
  const { value } = inputObj;
  if (value.length <= MAX_LENGTH && value <= MAX_VAL) return inputObj;
};

const Ofertar = ({ closeModal }) => {
  const onSubmit = (data) => {
    console.log(data);
  };

  const methods = useForm({ resolver: yupResolver(schema) });
  return (
    <div>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h3 className="mb-0">Completar oferta</h3>
        <button onClick={closeModal} className="btn p-1">
          <XIcon width={20} height={20} />
        </button>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="row g-2 g-md-3"
        >
          <CustomInput name={fieldNames.title} placeholder="Ingrese título" />

          <Controller
            name={fieldNames.price}
            control={methods.control}
            render={({ field, fieldState: { error } }) => (
              <div>
                <NumberFormat
                  {...field}
                  isAllowed={withValueLimit}
                  decimalSeparator={','}
                  thousandSeparator="."
                  autoComplete="off"
                  allowNegative={false}
                  decimalScale={0}
                  prefix="$"
                  onValueChange={({ floatValue }) => {
                    field.onChange(floatValue);
                    console.log(floatValue);
                  }}
                  className={clsx('form-control', error && 'is-invalid')}
                  placeholder="Ingrese precio"
                />

                {error && (
                  <span className="text-danger small">{error.message}</span>
                )}
              </div>
            )}
          />

          <Controller
            name={fieldNames.date}
            control={methods.control}
            render={({ field, fieldState: { error } }) => (
              <div>
                <DatePicker
                  {...field}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Fecha del servicio"
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
              </div>
            )}
          />

          <Controller
            name={fieldNames.city}
            control={methods.control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div>
                <Select
                  defaultValue={cities.find((city) => city.value === value)}
                  placeholder="Ciudad"
                  styles={error ? customErrorSelectStyles : customSelectStyles}
                  getOptionValue={(option) => option.value}
                  options={cities}
                  onChange={(e) => {
                    onChange(e.value);
                  }}
                />
                {error && (
                  <span className="text-danger small">{error.message}</span>
                )}
              </div>
            )}
          />

          <CustomInput
            name={fieldNames.neighborhood}
            placeholder="Ingrese barrio / localidad"
          />

          <CustomTextarea
            name={fieldNames.description}
            placeholder="Descripción"
          />

          <CustomButton
            type="submit"
            className="w-100 btn btn-primary text-white"
          >
            Crear oferta
          </CustomButton>
        </form>
      </FormProvider>
    </div>
  );
};

export default Ofertar;
