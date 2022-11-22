import React, { useContext } from 'react'
import PlayerProfile from '../components/PlayerProfile';
import RefereeProfile from '../components/RefereeProfile';

import {UserDataContext} from "../contexts/UserDataContext";

const ProfilePage = () => {
  const {userType} = useContext(UserDataContext);
  return (
    <div>
      {userType === 'player' ? <PlayerProfile/> : <RefereeProfile/>}
    </div>
  )
}

export default ProfilePage;