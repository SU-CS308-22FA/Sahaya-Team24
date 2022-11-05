import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

import classes from './SignOut.module.css';

const SignOut = () => {
    const auth = getAuth();
    let navigate = useNavigate();

    const navigateTosignin = () => {
    navigate('../');
    };

    const logout = async () => {
        signOut(auth).then(() => {
            console.log("Sign-out successful.");
            navigateTosignin();
          }).catch((error) => {
            console.log("An error happened.");
          });
      };

    return(
        <>
            <button className={classes.button} onClick={() => logout()}>
                SignOut!
            </button>
        </>
    );
}
//be careful about to return its not wraped in div
export default SignOut;