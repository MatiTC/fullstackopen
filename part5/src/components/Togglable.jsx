import { useState } from 'react';
import PropTypes from 'prop-types';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className={props.className}>
      <div style={hideWhenVisible}>
        <button id='buttonTogglabeOne' onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className='togglableContentDos'>
        {props.children}
        <button id='buttonTogglabeDos' onClick={toggleVisibility}>{props.buttonLabelDos}</button>
      </div>
    </div>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  buttonLabelDos: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
export default Togglable;
