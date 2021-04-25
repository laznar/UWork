import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import {
  startLoginWithEmailPassword,
  startGoogleLogin,
} from '../../redux/actions/auth';
import google from '../../assets/img/google.svg';

const LogIn = () => {
  const [{ email, password }, handleChange] = useForm({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const handleEmailLogin = (e) => {
    e.preventDefault();
    dispatch(startLoginWithEmailPassword(email, password));
  };

  const handleGoogleLogIn = (e) => {
    e.preventDefault();
    dispatch(startGoogleLogin());
  };

  return (
    <div className="fade-anim">
      <h2 className="mb-4">Inicia sesión</h2>
      <form action="" className="row g-3">
        <div>
          <button
            onClick={handleGoogleLogIn}
            className="btn btn-outline-light text-dark border flex align-items-center w-100"
          >
            <img src={google} height={20} width={20} alt="Google logo" />
            <span className="ms-2">Iniciar con Google</span>
          </button>
        </div>

        <div className="d-flex align-items-center">
          <hr className="flex-grow-1 bg-secondary" />
          <span className="mx-2 small text-muted">O inicia con tu correo</span>
          <hr className="flex-grow-1 bg-secondary" />
        </div>

        <div>
          <div className="form-floating">
            <input
              autoComplete="off"
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={handleChange}
            />
            <label htmlFor="email">Correo electrónico</label>
          </div>
        </div>

        <div>
          <div className="form-floating">
            <input
              autoComplete="off"
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Contraseña"
              value={password}
              onChange={handleChange}
            />
            <label htmlFor="password">Contraseña</label>
          </div>
        </div>

        <div>
          <button
            onClick={handleEmailLogin}
            className="btn btn-primary text-white w-100"
          >
            Iniciar sesión
          </button>
        </div>

        <div className="text-center small">
          No tienes una cuenta? <Link to="/auth/register">Regístrate</Link>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
