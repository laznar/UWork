import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';

const CustomInput = ({ name, placeholder, type = 'text' }) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <div>
      <div className="d-flex flex-column">
        <input
          // autoComplete="off"
          type={type}
          className={clsx('form-control', errors[name] && 'is-invalid')}
          id={name}
          placeholder={placeholder}
          {...register(name)}
        />

        {errors[name] && (
          <span className="text-danger small">{errors[name].message}</span>
        )}
      </div>
    </div>
  );
};

export default CustomInput;
