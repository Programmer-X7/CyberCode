import React from 'react'
import { useParams } from 'react-router-dom'

const UserProfile = () => {
    const { userId } = useParams();
    

  return (
    <div>UserProfile</div>
  )
}

export default UserProfile