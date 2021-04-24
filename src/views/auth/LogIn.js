import { Link } from 'react-router-dom';
import google from '../../assets/img/google.svg';

const LogIn = () => {
  return (
    <div className="fade-anim">
      <h2 className="mb-4">Inicia sesión</h2>
      <form action="" className="row g-3">
        <div>
          <button className="btn btn-outline-light text-dark border flex align-items-center w-100">
            <img src={google} height={20} width={20} alt="Google logo" />
            <span className="ms-2">Iniciar con Google</span>
          </button>
        </div>

        <div className="d-flex align-items-center">
          <hr className="flex-grow-1 bg-secondary" />
          <span className="mx-2 small">O inicia con tu correo</span>
          <hr className="flex-grow-1 bg-secondary" />
        </div>

        <div>
          <div className="form-floating">
            <input
              autoComplete="off"
              type="email"
              className="form-control"
              id="email"
              placeholder="Correo electrónico"
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
              placeholder="Contraseña"
            />
            <label htmlFor="password">Contraseña</label>
          </div>
        </div>

        <div>
          <button className="btn btn-primary text-white w-100">
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
