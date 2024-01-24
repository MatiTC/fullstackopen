import React from "react";

const Button = (props) => {

  console.log('props value is', props)
  const { handleClick, text } = props
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}
export default Button;
 