import Logo from '../../assets/img/logo.png';
import {Link} from 'react-router-dom'

export const Footer = () => {
  return (
    <div className="container">
      <footer className="pt-4 mb-md-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md d-flex flex-column align-items-center">
            <img className="mb-2" src={Logo} alt="" width="80" height="80" />
            <small className="d-block mb-3 text-muted">© 2021</small>
          </div>
          <div className="col-6 col-md text-center text-md-start">
            <h5>Features</h5>
            <ul className="list-unstyled text-small">
              <li className="mb-1">
                <Link className="link-secondary text-decoration-none">
                  Cool Stuff
                </Link>
              </li>
              <li className="mb-1">
                <Link className="link-secondary text-decoration-none" href="#">
                  Random Feature
                </Link>
              </li>
              <li className="mb-1">
                <Link className="link-secondary text-decoration-none" href="#">
                  Team Feature
                </Link>
              </li>
              <li className="mb-1">
                <Link className="link-secondary text-decoration-none" href="#">
                  Stuff for Developers
                </Link>
              </li>
              <li className="mb-1">
                <Link className="link-secondary text-decoration-none" href="#">
                  Another one
                </Link>
              </li>
              <li className="mb-1">
                <Link className="link-secondary text-decoration-none" href="#">
                  Last time
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md  text-center text-md-start">
            <h5>Resources</h5>
            <ul className="list-unstyled text-small">
              <li className="mb-1">
                <Link className="link-secondary text-decoration-none" href="#">
                  Resource
                </Link>
              </li>
              <li className="mb-1">
                <Link className="link-secondary text-decoration-none" href="#">
                  Resource name
                </Link>
              </li>
              <li className="mb-1">
                <Link className="link-secondary text-decoration-none" href="#">
                  Another Resource
                </Link>
              </li>
              <li className="mb-1">
                <Link className="link-secondary text-decoration-none" href="#">
                  Final Resource
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md text-center text-md-start">
            <h5>About</h5>
            <ul className="list-unstyled text-small">
              <li className="mb-1">
                <Link className="link-secondary text-decoration-none" href="#">
                  Team
                </Link>
              </li>
              <li className="mb-1">
                <Link className="link-secondary text-decoration-none" href="#">
                  Locations
                </Link>
              </li>
              <li className="mb-1">
                <Link className="link-secondary text-decoration-none" href="#">
                  Privacy
                </Link>
              </li>
              <li className="mb-1">
                <Link className="link-secondary text-decoration-none" href="#">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};
