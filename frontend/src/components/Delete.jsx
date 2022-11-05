import React from "react";
import { deleteFromFireBase } from "../utils/firebase";
import { getAuth } from "firebase/auth";
import PlayerDataService from '../services/player.service';
import { useNavigate } from 'react-router-dom';

const Delete = () => {
  let navigate = useNavigate();

  const navigateToSignIn = () => {
    navigate('/');
  };

  const deletePlayer = async () => {
    try {
      await PlayerDataService.delete(uID);
    } catch (err) {
      console.log(err);
    }
  };
  const uID = getAuth().currentUser.uid;
  deleteFromFireBase();
  deletePlayer();
  navigateToSignIn();
};

export default Delete;