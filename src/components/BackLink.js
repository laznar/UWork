import { ChevronLeftIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

const BackLink = ({ to = '/', children = 'Volver', ...rest }) => {
  return (
    <Link
      to={to}
      className="link-primary cursor-pointer d-inline-flex align-items-center mb-1"
      {...rest}
    >
      <ChevronLeftIcon width={20} height={20} />
      {children}
    </Link>
  );
};

export default BackLink;
