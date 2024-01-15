import React from 'react'

export default function Button({handleClick,texto}) {
  return (
    <button onClick={handleClick}>{texto}</button>
  )
}
