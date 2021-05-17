import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import autosize from 'autosize';

const CustomTextarea = ({ name, placeholder, type = 'text', ...rest }) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  useEffect(() => {
    autosize(document.getElementById('textarea'));
  }, []);

  return (
    <>
      <textarea
        name={name}
        id="textarea"
        placeholder="Acerca de mi"
        className={clsx('form-control', errors[name] && 'is-invalid')}
        {...register(name)}
        {...rest}
      />
      {errors[name] && (
        <span className="text-danger small">{errors[name].message}</span>
      )}
    </>
  );
};

export default CustomTextarea;
