import React from "react";
import { useState, useEffect } from "react";
import { TextField, Button, Typography, Card } from "@mui/material";
import {
  registerWithEmailAndPassword,
  signInWithGooglePopup,
} from "../utils/firebase";

import { useNavigate } from 'react-router-dom';

import classes from "./Register.module.css";
import Layout from './layout/Layout';

const Register = () => {
  const [uMail, setUMail] = useState("");
  const [uPassword, setUPassword] = useState("");
  const [uCPassword, setUCPassword] = useState("");
  
  let navigate = useNavigate();


  const handleSubmit = async () => {
   
    try {
      const { user } = await registerWithEmailAndPassword(uMail, uPassword);
      console.log(user);
      navigateToCP();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  
  
  const navigateToCP = () => {
    navigate('/RegisterP/CreateProfile');
    };

    const navigateToSign = () => {
      navigate('/');
    };

  return (
    
      <div>
        <Layout>
        <Card className={classes.card}>
        <Typography variant="h4" color="#076a06" align="center" gutterBottom>
            Welcome To Sahaya 
          </Typography>
        
        <div className={classes.textFieldCss}>
        <TextField
          color="success"
          className={classes.textFieldCss}
          id="input_mail"
          required
          type="email"
          label="Email"
          variant="outlined"
          value={uMail}
          onChange={(event) => setUMail(event.target.value)}
        />
        </div>
          <div className={classes.textFieldCss}>
          <TextField
          color="success"
          className={classes.textFieldCss}
          id="input_password"
          required
          type="password"
          label="Password"
          variant="outlined"
          value={uPassword}
          error={false}
          onChange={(event) => setUPassword(event.target.value)}
        />
          </div>
        <div className={classes.textFieldCss}>
        <TextField
        color="success"
        className={classes.textFieldCss}
          id="input_confirm_password"
          required
          type="password"
          label="Confirm Password"
          variant="outlined"
          value={uCPassword}
          onChange={(event) => setUCPassword(event.target.value)}
        />
        </div>
        {uPassword != uCPassword && uCPassword != "" ? (
          <div>Passwords don't match!</div>
        ) : null}
        <div>
        <Button color="success" className={classes.button} variant="contained" onClick={() => handleSubmit()}>
          Register!
        </Button>
        </div>
        <div>
        <Button className={classes.haveAccount} disabled={false} onClick={navigateToSign}>Already Have An Acccount?</Button>
        </div>
        </Card>
      </Layout>
      </div>
  );
};

export default Register;
