import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Select from 'react-select';
import { ChevronLeftIcon } from '@heroicons/react/outline';

import {
  customSelectStyles,
  customErrorSelectStyles
} from '../../utils/selectStyles';
import { transports } from '../../utils/enums';
import tasks from '../../utils/tasks';

import CustomInput from '../../components/form-controls/CustomInput';
import CustomTextarea from '../../components/form-controls/CustomTextarea';

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
      [fieldNames.phoneNumber]: formData[fieldNames.phoneNumber],
      [fieldNames.transport]: formData[fieldNames.transport],
      [fieldNames.skills]: formData[fieldNames.skills],
      [fieldNames.aboutMe]: formData[fieldNames.aboutMe]
    }
  });

  const onSubmit = (data) => {
    setStep((step) => step + 1);
    setFormData({ ...formData, ...data });
  };

  return (
    <div className="fade-anim">
      <span
        onClick={() => setStep((step) => step - 1)}
        className="link-primary cursor-pointer d-flex align-items-center mb-1"
      >
        <ChevronLeftIcon width={20} height={20} />
        Atrás
      </span>
      <h4 className="mb-3">Datos de servicio</h4>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="row g-3">
          <CustomInput
            name={fieldNames.phoneNumber}
            placeholder="Ingresa celular"
          />

          <div>
            <Controller
              name={fieldNames.transport}
              control={methods.control}
              render={({
                field: { onChange, value },
                formState: { errors }
              }) => (
                <>
                  <Select
                    defaultValue={transports.find(
                      (transport) => transport.value === value
                    )}
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
                      updateFormData(fieldNames.transport, e.value);
                    }}
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
            <Controller
              render={({
                field: { onChange, value },
                formState: { errors }
              }) => (
                <>
                  <Select
                    defaultValue={value?.map((task) =>
                      tasks.find((t) => t.value === task)
                    )}
                    placeholder="Añadir habilidades"
                    isMulti
                    styles={
                      errors[fieldNames.skills]
                        ? customErrorSelectStyles
                        : customSelectStyles
                    }
                    getOptionValue={(option) => option.value}
                    options={tasks}
                    onChange={(e) => {
                      const values = e.map((op) => op.value);
                      onChange(values);
                      updateFormData(fieldNames.skills, values);
                    }}
                  />
                  {errors[fieldNames.skills] && (
                    <span className="text-danger small">
                      {errors[fieldNames.skills].message}
                    </span>
                  )}
                </>
              )}
              name={fieldNames.skills}
              control={methods.control}
            />
          </div>

          <div>
            <CustomTextarea name={fieldNames.aboutMe} />
          </div>

          <div>
            <button type="submit" className="btn btn-primary text-white w-100">
              Siguiente
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ServicesDataStep;
