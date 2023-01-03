import React,{useState} from "react";
import { deleteFromFireBase } from "../utils/firebase";
import { getAuth } from "firebase/auth";
import PlayerDataService from '../services/player.service';
import MatchDataService from "../services/match.service";

const Delete = (uID) => {
  
    const call = async () =>{
      let playerArray = await (await PlayerDataService.get(uID)).data.matches
      playerArray.forEach(async element => {
        await MatchDataService.deletePlayerFromMatch(element,uID)
      })
      
      let res = await MatchDataService.getAll()
      let array = res.data.filter(obj => obj.owner_id === uID)
      array.forEach(async (element)=>{
        await MatchDataService.delete(element.m_id)
      })
      await PlayerDataService.delete(uID); //DELETE PLAYER
      deleteFromFireBase();
    }
    call()
  
};

export default Delete;