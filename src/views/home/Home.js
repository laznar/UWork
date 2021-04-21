import MainHome from './MainHome';
import { Popular } from './Popular';
import { Footer } from './Footer';

const Home = () => {
  return (
    <div className="fade-anim">
      <MainHome />
      <Popular />
      <Footer />
    </div>
  );
};

export default Home;
