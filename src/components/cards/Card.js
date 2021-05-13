import clsx from 'clsx';
const Card = ({ children, className }) => {
  return (
    <div
      className={clsx(
        'mx-auto border rounded-3 p-4 shadow-sm bg-white mb-3',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
