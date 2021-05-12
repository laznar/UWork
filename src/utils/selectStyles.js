export const customSelectStyles = {
  option: (provided, state) => ({
    ...provided
  }),
  control: (provided, state) => ({
    ...provided,
    boxShadow: state.isFocused ? '0 0 0 0.25rem rgb(69 168 216 / 25%)' : 'none',
    borderColor: state.isFocused ? '#a2d4ec' : '#ced4da',

    '&:hover': {
      borderColor: undefined
    }
  })
};

export const customErrorSelectStyles = {
  option: (provided, state) => ({
    ...provided
  }),
  control: (provided, state) => ({
    ...provided,
    boxShadow: state.isFocused ? '0 0 0 0.25rem rgb(220 53 69 / 25%)' : 'none',
    borderColor: '#dc3545',

    '&:hover': {
      borderColor: undefined
    }
  })
};
