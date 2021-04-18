import TaskSearch from '../../components/TaskSearch/TaskSearch';

const MainHome = () => {
  return (
    <main style={{ height: '100vh' }} className="d-flex align-items-center">
      <div className="container">
        <div className="row ps-lg-5 gx-0">
          <div className="col-lg-6 border p-4 rounded-3 shadow-sm mt-5">
            <h1 className="mb-3">
              Ayuda cuando la necesitas, a unos cuantos clics
            </h1>

            <TaskSearch />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainHome;
