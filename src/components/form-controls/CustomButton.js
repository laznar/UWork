const CustomButton = ({ loading, children, wrapperClassName, ...rest }) => {
  return (
    <div className={wrapperClassName}>
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
