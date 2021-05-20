import { useState, useEffect, useMemo } from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import CustomInput from '../../components/form-controls/CustomInput';
import CustomButton from '../../components/form-controls/CustomButton';
import { startEditUserInfo } from '../../redux/actions/auth';
import BackLink from '../../components/BackLink';

const fieldNames = {
  email: 'email',
  password: 'password'
};

const schema = yup.object().shape({
  [fieldNames.email]: yup
    .string()
    .email('correo inválido')
    .required('campo requerido'),
  [fieldNames.password]: yup
    .string()
    .required('campo requerido')
    .min(6, 'mínimo 6 caracteres')
});

const EditEmail = () => {
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const authUi = useSelector((state) => state.authUi);
  const auth = useSelector((state) => state.auth);

  const defaultValues = useMemo(
    () => ({
      [fieldNames.email]: auth.email,
      [fieldNames.password]: ''
    }),
    [auth]
  );
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues
  });

  const email = useWatch({
    control: methods.control,
    name: fieldNames.email,
    defaultValue: defaultValues.email
  });

  const password = useWatch({
    control: methods.control,
    name: fieldNames.password,
    defaultValue: defaultValues.password
  });

  useEffect(() => {
    if (_.isEqual(email, defaultValues.email)) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [defaultValues, email, password.length]);

  const onSubmit = (data) => {
    if (!authUi.loading && !disabled) {
      dispatch(startEditUserInfo(data));
    }
  };
  return (
    <div
      style={{ maxWidth: 500 }}
      className="mx-auto border fade-anim rounded-3 p-4 shadow-sm bg-white"
    >
      <BackLink to="/perfil">Ir a perfil</BackLink>
      <h4 className="mb-3">Correo</h4>

      <p>Para cambiar tu correo debes ingresar tu contraseña</p>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="row g-3">
          <CustomInput name={fieldNames.email} placeholder="Correo" />
          <CustomInput
            type="password"
            name={fieldNames.password}
            placeholder="Ingresa tu contraseña"
          />

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

export default EditEmail;
