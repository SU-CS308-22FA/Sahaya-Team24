import RefereeDataService from '../services/referee.service';
import { getAuth } from "firebase/auth";

const updateReferee = async (body) => {
  const uID = getAuth().currentUser.uid;
  try{
    await RefereeDataService.update(uID,body);
  }catch (err) {
      console.log(err);
  }
};

export default updateReferee;