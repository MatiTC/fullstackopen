import React from 'react'

const OneUser = ({user}) => {
    console.log(`Usuario por peticion de app:`, user)
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