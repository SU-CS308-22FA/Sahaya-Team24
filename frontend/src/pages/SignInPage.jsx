import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { TextField, Button, Typography, Card  } from "@mui/material";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import classes from '../components/Mix.module.css';
import Layout from '../components/layout/Layout';

import { UserDataContext } from "../contexts/UserDataContext";
import { UserIdContext } from "../contexts/UserIdContext";

const SignInPage = () => {
    const auth = getAuth();
    const [uMail, setUMail] = useState("");
    const [uPassword, setUPassword] = useState("");
    let navigate = useNavigate();

    const [uType, setUType] = useState('player');
    const {userType, setUserType} = useContext(UserDataContext);
    const {setUserId} = useContext(UserIdContext);

    const navigateToHome = () => {
      navigate('./HomePage');
    };

    const navigateToReg = () => {
      navigate('/RegisterPage');
    };

    const handleSubmit = async () => {
      try{
        const { user } = await signInWithEmailAndPassword(auth, uMail, uPassword);
        setUserId(user.uid);
        console.log(user.uid);
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
      <Card style={{backgroundImage:"url('https://amplex.dk/wp-content/uploads/2016/08/iStock_000022325111Large.jpg')", backgroundSize:"cover", backgroundPosition:"center", height:"100vh", borderRadius:"0"}}>
          <Layout>
          <Card style={{ backgroundColor:"#ffffff", opacity:"85%"}} className={classes.card}>
          <Typography variant="h4" color="#00466e" align="center" gutterBottom>
            Welcome To Sahaya 
            </Typography>
            <div className={classes.textFieldCss}>
            <TextField
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
              style={{color: "#076a06"}}
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

            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Type of user</FormLabel>
              <RadioGroup row value={uType} onChange={(e) => setUType(e.target.value)}>
                <FormControlLabel value="player" control={<Radio />} label="Player" />
                <FormControlLabel value="referee" control={<Radio />} label="Referee" />
              </RadioGroup>
            </FormControl>

            <Button style={{margin:"5px"  }} variant="contained" onClick={() => handleSubmit()}>
              SignIn
            </Button>
            <div>
              <Button onClick={navigateToReg}>Don't Have An Acccount?</Button>
            </div>
          </Card>          
        </Layout>
        </Card>
      );
}

export default SignInPage;

