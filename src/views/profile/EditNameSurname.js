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
  name: 'name',
  surname: 'surname'
};

const schema = yup.object().shape({
  [fieldNames.name]: yup.string().required('campo requerido'),
  [fieldNames.surname]: yup.string().required('campo requerido')
});

const NameSurname = () => {
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const authUi = useSelector((state) => state.authUi);
  const auth = useSelector((state) => state.auth);

  const defaultValues = useMemo(
    () => ({
      [fieldNames.name]: auth.userData.name,
      [fieldNames.surname]: auth.userData.surname
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
      <h4 className="mb-3">Nombre y apellidos</h4>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="row g-3">
          <CustomInput name={fieldNames.name} placeholder="Nombre" />

          <CustomInput name={fieldNames.surname} placeholder="Apellidos" />

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

export default NameSurname;
