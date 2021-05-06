import Logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="border-top">
      <div className="container">
        <footer className="py-5 mb-md-5">
          <div className="row justify-content-center">
            <div className="col-md-3 d-flex flex-column align-items-center order-1 order-md-0">
              <img className="mb-2" src={Logo} alt="" width="80" height="80" />
              <small className="d-block mb-3 text-muted">© 2021</small>
            </div>
            <div className="col-sm-6 col-md-3 text-center text-md-start mb-4 mb-md-0">
              <h5>Features</h5>
              <ul className="list-unstyled text-small">
                <li className="mb-1">
                  <Link className="link-secondary text-decoration-none">
                    Cool Stuff
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    className="link-secondary text-decoration-none"
                    href="#"
                  >
                    Random Feature
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    className="link-secondary text-decoration-none"
                    href="#"
                  >
                    Team Feature
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    className="link-secondary text-decoration-none"
                    href="#"
                  >
                    Stuff for Developers
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    className="link-secondary text-decoration-none"
                    href="#"
                  >
                    Another one
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    className="link-secondary text-decoration-none"
                    href="#"
                  >
                    Last time
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-sm-6 col-md-3 text-center text-md-start mb-4 mb-md-0">
              <h5>Resources</h5>
              <ul className="list-unstyled text-small">
                <li className="mb-1">
                  <Link
                    className="link-secondary text-decoration-none"
                    href="#"
                  >
                    Resource
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    className="link-secondary text-decoration-none"
                    href="#"
                  >
                    Resource name
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    className="link-secondary text-decoration-none"
                    href="#"
                  >
                    Another Resource
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    className="link-secondary text-decoration-none"
                    href="#"
                  >
                    Final Resource
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-sm-6 col-md-3 text-center text-md-start mb-4 mb-md-0">
              <h5>About</h5>
              <ul className="list-unstyled text-small">
                <li className="mb-1">
                  <Link
                    className="link-secondary text-decoration-none"
                    href="#"
                  >
                    Team
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    className="link-secondary text-decoration-none"
                    href="#"
                  >
                    Locations
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    className="link-secondary text-decoration-none"
                    href="#"
                  >
                    Privacy
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    className="link-secondary text-decoration-none"
                    href="#"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
