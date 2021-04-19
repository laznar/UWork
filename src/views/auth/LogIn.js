import { Link } from 'react-router-dom';

const LogIn = () => {
  return (
    <div className="fade-anim">
      <h2 className="mb-4">Inicia sesión</h2>
      <form action="" className="row g-3">
        <div className="col-12">
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

        <div className="col-12">
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

        <div className="col-12">
          <button className="btn btn-primary btn-lg text-white col-12">
            Iniciar sesión
          </button>
        </div>

        <p className="col-12 text-center">
          No tienes una cuenta? <Link to="/auth/register">Regístrate</Link>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
