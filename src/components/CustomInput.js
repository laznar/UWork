import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';

const CustomInput = ({ name, placeholder, label, type = 'text' }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-baseline">
        {label && (
          <label htmlFor={name} className="form-label mb-1">
            {label}
          </label>
        )}
        {errors[name] && (
          <div className="text-danger small">{errors[name].message}</div>
        )}
      </div>
      <input
        autoComplete="off"
        type={type}
        className={clsx('form-control', errors[name] && 'is-invalid')}
        id={name}
        {...register(name)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomInput;
