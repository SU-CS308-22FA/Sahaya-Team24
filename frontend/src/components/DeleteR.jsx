import { deleteFromFireBase } from "../utils/firebase";
import { getAuth } from "firebase/auth";
import RefereeDataService from '../services/referee.service';

const DeleteR = async () => {
  const uID = getAuth().currentUser.uid;
  try {
    deleteFromFireBase();
    await RefereeDataService.delete(uID);
  } catch (err) {
    console.log(err);
  }
};

export default DeleteR;