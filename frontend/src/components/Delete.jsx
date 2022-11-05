import React from "react";
import { deleteFromFireBase } from "../utils/firebase";
import { getAuth } from "firebase/auth";
import PlayerDataService from '../services/player.service';

const Delete = () => {
  const deletePlayer = async () => {
    try {
        await PlayerDataService.delete(uID);
    } catch (err) {
      console.log(err);
    }
  };
  const uID = getAuth().currentUser.uid;
  deletePlayer();
  deleteFromFireBase();

  return <div>Delete</div>;
};

export default Delete;