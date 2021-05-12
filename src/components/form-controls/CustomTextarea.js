import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';

const CustomTextarea = ({ name, placeholder, type = 'text', ...rest }) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <>
      <textarea
        name={name}
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
