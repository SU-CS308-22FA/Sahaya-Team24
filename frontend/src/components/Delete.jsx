import React from "react";
import { deleteFromFireBase } from "../utils/firebase";
import { getAuth } from "firebase/auth";
import PlayerDataService from '../services/player.service';

const Delete = async () => {
  const uID = getAuth().currentUser.uid;
  try {
    deleteFromFireBase();
    await PlayerDataService.delete(uID);
  } catch (err) {
    console.log(err);
  }
};

export default Delete;