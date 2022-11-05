import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { TextField, Button, Container, Typography, colors, Card  } from "@mui/material";


import classes from './SignIn.module.css';
import Layout from './layout/Layout';


const SignIn = () => {
    const auth = getAuth();
    const [uMail, setUMail] = useState("");
    const [uPassword, setUPassword] = useState("");
    let navigate = useNavigate();


    const navigateToHome = () => {
    navigate('./HomePage');
    };

    const navigateToReg = () => {
      navigate('/RegisterP');
    };

    const handleSubmit = async () => {
      try{
      
        const { user } = await signInWithEmailAndPassword(auth, uMail, uPassword);
        console.log(user);
        console.log(user.email);
        navigateToHome();
      } catch (error) {
        if (error.code === "auth/wrong-password") {
          alert("Wrong Password");
        }else if (error.code === "auth/user-not-found") {
          alert("Wrong Email Address");
        }else {
          console.log("sign in attempt encountered an error", error);
        }
      }
    }

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
            <Button color="success" className={classes.button} variant="contained" onClick={() => handleSubmit()}>
              SignIn
            </Button>
            <div>
              <Button color="success" className={classes.haveAccount} disabled={false} onClick={navigateToReg}>Don't Have An Acccount?</Button>
            </div>
          </Card>
          
          
        </Layout>
        
      </div>
      );
}

export default SignIn;

