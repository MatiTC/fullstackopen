import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    type,
    value,
    onChange,
    reset,
    props: {
      type,
      value,
      onChange
    }
  };
};

// los módulos pueden tener muchas exportaciones nombradas

export const useAnotherHook = () => {
  // ...
};
