const Card = ({ children }) => {
  return (
    <div className="mx-auto border rounded-3 p-4 shadow-sm bg-white mb-3">
      {children}
    </div>
  );
};

export default Card;
