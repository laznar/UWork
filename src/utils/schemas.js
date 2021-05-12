import * as yup from 'yup';
import { workerRegisterFieldNames, workerUpdateFieldNames } from './fieldNames';

const workerRegisterSchema = yup.object().shape({
  [workerRegisterFieldNames.name]: yup.string().required('campo requerido'),
  [workerRegisterFieldNames.surname]: yup.string().required('campo requerido'),
  [workerRegisterFieldNames.email]: yup
    .string()
    .email('correo inválido')
    .required('campo requerido'),
  [workerRegisterFieldNames.password]: yup
    .string()
    .required('campo requerido')
    .min(6, 'mínimo 6 caracteres'),
  [workerRegisterFieldNames.confirm]: yup
    .string()
    .required('campo requerido')
    .min(6, 'mínimo 6 caracteres')
    .oneOf(
      [yup.ref(workerRegisterFieldNames.password)],
      'las contraseñas deben coincidir'
    ),
  [workerRegisterFieldNames.gender]: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required()
    })
    .required('campo requerido'),
  [workerRegisterFieldNames.typeOfId]: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required()
    })
    .required('campo requerido'),
  [workerRegisterFieldNames.personalId]: yup
    .string()
    .required('campo requerido')
    .matches(/^[0-9]+$/, 'debe ser un número'),
  [workerRegisterFieldNames.city]: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required()
    })
    .required('campo requerido'),
  [workerRegisterFieldNames.address]: yup.string().required('campo requerido'),
  [workerRegisterFieldNames.phoneNumber]: yup
    .string()
    .required('campo requerido')
    .matches(/^[0-9]+$/, 'debe ser un número')
    .test(
      'len',
      'el celular debe ser de 10 dígitos',
      (val) => val.length === 10
    ),

  [workerRegisterFieldNames.transport]: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required()
    })
    .required('campo requerido'),
  [workerRegisterFieldNames.aboutMe]: yup.string().required('campo requerido')
});

const workerUpdateSchema = yup.object().shape({
  [workerUpdateFieldNames.gender]: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required()
    })
    .required('campo requerido'),
  [workerUpdateFieldNames.typeOfId]: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required()
    })
    .required('campo requerido'),
  [workerUpdateFieldNames.personalId]: yup
    .string()
    .required('campo requerido')
    .matches(/^[0-9]+$/, 'debe ser un número'),
  [workerUpdateFieldNames.city]: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required()
    })
    .required('campo requerido'),
  [workerUpdateFieldNames.address]: yup.string().required('campo requerido'),
  [workerUpdateFieldNames.phoneNumber]: yup
    .string()
    .required('campo requerido')
    .matches(/^[0-9]+$/, 'debe ser un número')
    .test(
      'len',
      'el celular debe ser de 10 dígitos',
      (val) => val.length === 10
    ),

  [workerUpdateFieldNames.transport]: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required()
    })
    .required('campo requerido'),
  [workerUpdateFieldNames.aboutMe]: yup.string().required('campo requerido')
});

export { workerRegisterSchema, workerUpdateSchema };
