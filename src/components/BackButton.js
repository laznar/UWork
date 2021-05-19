import { ChevronLeftIcon } from '@heroicons/react/outline';

const BackButton = ({ onClick, children = 'Volver', ...rest }) => {
  return (
    <span
      onClick={onClick}
      className="link-primary cursor-pointer d-inline-flex align-items-center mb-1"
      {...rest}
    >
      <ChevronLeftIcon width={20} height={20} />
      {children}
    </span>
  );
};

export default BackButton;
