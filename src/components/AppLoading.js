import logo from '../assets/img/logo.png';

const AppLoading = () => {
  return (
    <div className="vh-100 fade-anim d-flex flex-column justify-content-center align-items-center text-primary">
      <img src={logo} alt="" className="logo-anim" width={100} height={100} />
      <div className="spinner-border"></div>
    </div>
  );
};

export default AppLoading;
