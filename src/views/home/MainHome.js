import TaskSearch from '../../components/TaskSearch/TaskSearch';
import styled from 'styled-components';

import image1 from '../../assets/img/image-1.jpg';
import image2 from '../../assets/img/image-2.jpg';
import image3 from '../../assets/img/image-3.jpg';
import image4 from '../../assets/img/image-4.jpg';

const images = [image1, image2, image3, image4];
const currentImage = images[Math.floor(Math.random() * images.length)];

const CustomMain = styled.main`
  height: 100vh;
  min-height: 568px;
  background-image: url(${currentImage});
  background-position: 80% bottom;
  background-repeat: no-repeat;
  background-size: auto 85%;
`;

const MainHome = () => {
  return (
    <CustomMain className="d-flex align-items-center border-bottom bg-white">
      <div className="container">
        <div className="row ps-lg-5 gx-0 pt-5 pt-lg-0 mt-5 mt-lg-0">
          <div
            style={{
              backgroundColor: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(4px)'
            }}
            className="col-md-8 col-lg-6 border p-3 p-md-4 mt-5 mt-lg-0 rounded-3 shadow-sm"
          >
            <h1 className="mb-3 fs-2">
              Ayuda cuando la necesitas, a unos cuantos clics
            </h1>
            <TaskSearch />
          </div>
        </div>
      </div>
    </CustomMain>
  );
};

export default MainHome;
