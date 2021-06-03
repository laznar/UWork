import { useEffect, useMemo, useState } from 'react';
import Card from '../components/cards/Card';
import Select from 'react-select';
import ServiceCard from '../components/cards/ServiceCard';
import CustomButton from '../components/form-controls/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import * as yup from 'yup';
import tasks from '../utils/tasks';
import { startEditUserInfo } from '../redux/actions/auth';
import {
  customErrorSelectStyles,
  customSelectStyles
} from '../utils/selectStyles';

const fieldNames = {
  skills: 'skills'
};

const schema = yup.object().shape({
  [fieldNames.skills]: yup
    .array()
    .test({
      message: 'Debes escoger al menos una habilidad',
      test: (arr) => arr?.length >= 1
    })
    .required('campo requerido')
});

const Servicios = () => {
  const [disabled, setDisabled] = useState(false);

  const auth = useSelector((state) => state.auth);
  const authUi = useSelector((state) => state.authUi);

  const dispatch = useDispatch();
  const defaultValues = useMemo(
    () => ({
      [fieldNames.skills]: auth.userData.skills
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
    <div className="container custom-container fade-anim">
      <div style={{ maxWidth: 600 }} className="mx-auto">
        <h2 className="mb-4">Servicios</h2>
        <Card>
          <h5>Registra habilidades</h5>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
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
            <CustomButton
              disabled={disabled}
              loading={authUi.loading}
              className="btn btn-primary text-white w-100 mt-4"
              type="submit"
            >
              Guardar
            </CustomButton>
          </form>
        </Card>
        {auth.userData.skills.map((skill, idx) => {
          return <ServiceCard key={idx} skill={skill} />;
        })}
      </div>
    </div>
  );
};

export default Servicios;
