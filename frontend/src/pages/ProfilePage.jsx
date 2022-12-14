import React, { useEffect, useState } from 'react'
import PlayerProfile from '../components/PlayerProfile';
import RefereeProfile from '../components/RefereeProfile';


const ProfilePage = () => {
  const [uType, setUType] = useState(window.localStorage.getItem('user_type'));

  useEffect(() => {
    const userType = window.localStorage.getItem('user_type')
    if (userType !== null) setUType(userType);
    console.log(uType);
  }, [])

  return (
    <div>
      {uType === "player" ? <PlayerProfile/> : <RefereeProfile/>}
    </div>
  )
}

export default ProfilePage;