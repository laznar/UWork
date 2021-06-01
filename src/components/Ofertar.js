import { FormProvider, useForm, Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import CustomInput from './form-controls/CustomInput';
import CustomTextarea from './form-controls/CustomTextarea';
import CustomButton from './form-controls/CustomButton';

import { startCreateOpportunity } from '../redux/actions/opportunities';
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

const Ofertar = ({ closeModal, workerUid }) => {
  const authUi = useSelector((state) => state.authUi);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (!authUi.loading) {
      dispatch(
        startCreateOpportunity(data, workerUid, closeModal, methods.reset)
      );
    }
  };

  const methods = useForm({
    resolver: yupResolver(schema)
  });
  return (
    <div className="d-flex flex-column h-100">
      <div
        className="d-flex justify-content-between align-items-center position-sticky top-0 p-3 bg-white border-bottom"
        style={{ zIndex: 2 }}
      >
        <h4 className="mb-0">Completar oferta</h4>
        <button
          onClick={closeModal}
          className="btn btn-outline-danger d-flex p-1"
        >
          <XIcon width={20} height={20} />
        </button>
      </div>
      <FormProvider {...methods}>
        <div className="flex-grow-1">
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="row gx-0 gy-3 p-3"
          >
            <CustomInput
              name={fieldNames.title}
              placeholder="Título de la oferta"
              autoComplete="off"
            />
            <Controller
              name={fieldNames.date}
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <DatePicker
                    {...field}
                    popperPlacement="bottom-start"
                    popperModifiers={{
                      flip: {
                        behavior: ['bottom'] // don't allow it to flip to be above
                      },
                      preventOverflow: {
                        enabled: false // tell it not to try to stay within the view (this prevents the popper from covering the element you clicked)
                      },
                      hide: {
                        enabled: false // turn off since needs preventOverflow to be enabled
                      }
                    }}
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
              name={fieldNames.price}
              control={methods.control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <div>
                  <NumberFormat
                    isAllowed={withValueLimit}
                    decimalSeparator={','}
                    thousandSeparator="."
                    autoComplete="off"
                    allowNegative={false}
                    decimalScale={0}
                    prefix="$"
                    onValueChange={({ floatValue }) => {
                      onChange(floatValue);
                    }}
                    className={clsx('form-control', error && 'is-invalid')}
                    placeholder="Precio"
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
              render={({
                field: { onChange, value },
                fieldState: { error }
              }) => (
                <div>
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
                </div>
              )}
            />
            <CustomInput
              autoComplete="off"
              name={fieldNames.neighborhood}
              placeholder="Barrio / localidad"
            />
            <CustomTextarea
              name={fieldNames.description}
              placeholder="Descripción de la oferta"
            />
            <CustomButton
              loading={authUi.loading}
              type="submit"
              className="w-100 btn btn-primary text-white position-sticky bottom-0"
            >
              Crear oferta
            </CustomButton>
          </form>
        </div>
      </FormProvider>
    </div>
  );
};

export default Ofertar;
