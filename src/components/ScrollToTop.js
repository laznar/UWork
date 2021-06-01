import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, params]);

  return null;
};

export default ScrollToTop;
