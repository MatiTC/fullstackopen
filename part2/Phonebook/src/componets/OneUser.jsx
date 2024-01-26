import React from 'react'

const OneUser = ({user}) => {
    console.log(`Usuario por peticion de app:`, user)
    if (!user) {
      return null; // O un mensaje indicando que no hay datos
    }
  return (
    <div>
        <ul>
            <li>{user.name}</li>
            <li>{user.number}</li>
        </ul>
    </div>
  )
}

export default OneUser