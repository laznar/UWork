import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import OverlayScrollbars from 'overlayscrollbars';

const ScrollToTop = () => {
  const location = useLocation();
  const params = useParams();
  const instance = OverlayScrollbars(document.body, {
    className: 'os-theme-dark'
  });

  useEffect(() => {
    instance.scroll({ y: 0 }, 200, { y: 'linear' });
  }, [location.pathname, params, instance]);

  return null;
};

export default ScrollToTop;
