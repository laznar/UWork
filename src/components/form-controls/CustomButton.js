const CustomButton = ({ loading, children, ...rest }) => {
  return (
    <div>
      <button aria-disabled={loading} disabled={loading} {...rest}>
        {loading ? (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        ) : (
          children
        )}
      </button>
    </div>
  );
};

export default CustomButton;
