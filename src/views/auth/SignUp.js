import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="fade-anim">
      <h2 className="mb-4">Crear cuenta</h2>
      <form action="" className="row g-3">
        <div className="col-md-6">
          <div className="form-floating">
            <input
              autoComplete="off"
              type="text"
              className="form-control"
              id="name"
              placeholder="Nombres"
            />
            <label htmlFor="name">Nombres</label>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-floating">
            <input
              autoComplete="off"
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Apellidos"
            />
            <label htmlFor="lastName">Apellidos</label>
          </div>
        </div>

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
            Crear cuenta
          </button>
        </div>

        <p className="col-12 text-center">
          Ya tienes una cuenta? <Link to="/auth/login">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
