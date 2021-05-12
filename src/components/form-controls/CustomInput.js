import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';

const CustomInput = ({ name, type = 'text', ...rest }) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <div>
      <input
        type={type}
        className={clsx('form-control', errors[name] && 'is-invalid')}
        id={name}
        {...register(name)}
        {...rest}
      />

      {errors[name] && (
        <span className="text-danger small">{errors[name].message}</span>
      )}
    </div>
  );
};

export default CustomInput;
