import { useState } from 'react';

export const useForm = (initialState = {}) => {
  const [formData, setFormData] = useState(initialState);

  const reset = () => {
    setFormData(initialState);
  };
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  return [formData, handleChange, reset];
};
