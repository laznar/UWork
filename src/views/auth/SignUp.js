import { Link } from 'react-router-dom';
// import { useForm } from '../../hooks/useForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';

const schema = yup.object().shape({
  name: yup.string().required('campo requerido'),
  lastName: yup.string().required('campo requerido'),
  email: yup.string().email('correo inválido').required('campo requerido'),
  password: yup
    .string()
    .required('campo requerido')
    .min(6, 'Mínimo 6 caracteres'),
});

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => alert(JSON.stringify(data, null, 2));
  return (
    <div className="fade-anim">
      <h2 className="mb-4">Crear cuenta</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
        <div>
          <div className="d-flex justify-content-between align-items-baseline">
            <label htmlFor="name" className="form-label mb-1">
              Nombres
            </label>
            {errors.name && (
              <div className="text-danger small">{errors.name.message}</div>
            )}
          </div>
          <input
            autoComplete="off"
            type="text"
            className={clsx('form-control', errors.name && 'is-invalid')}
            id="name"
            {...register('name')}
            placeholder="Nombres"
          />
        </div>

        <div>
          <div className="d-flex justify-content-between align-items-baseline">
            <label htmlFor="lastName" className="form-label mb-1">
              Apellidos
            </label>
            {errors.lastName && (
              <div className="text-danger small">{errors.lastName.message}</div>
            )}
          </div>
          <input
            autoComplete="off"
            type="text"
            className={clsx('form-control', errors.lastName && 'is-invalid')}
            id="lastName"
            {...register('lastName')}
            placeholder="Apellidos"
          />
        </div>

        <div>
          <div className="d-flex justify-content-between align-items-baseline">
            <label htmlFor="email" className="form-label mb-1">
              Correo electrónico
            </label>
            {errors.email && (
              <div className="text-danger small">{errors.email.message}</div>
            )}
          </div>
          <input
            autoComplete="off"
            className={clsx('form-control', errors.email && 'is-invalid')}
            id="email"
            {...register('email')}
            placeholder="Correo electrónico"
          />
        </div>

        <div>
          <div className="d-flex justify-content-between align-items-baseline">
            <label htmlFor="password" className="form-label mb-1">
              Contraseña
            </label>
            {errors.password && (
              <div className="text-danger small">{errors.password.message}</div>
            )}
          </div>
          <input
            autoComplete="off"
            type="password"
            className={clsx('form-control', errors.password && 'is-invalid')}
            id="password"
            {...register('password')}
            placeholder="Contraseña"
          />
        </div>

        <div>
          <button className="btn btn-primary text-white col-12">
            Crear cuenta
          </button>
        </div>

        <p className="text-center small">
          Ya tienes una cuenta? <Link to="/auth/login">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
