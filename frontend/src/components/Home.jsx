import React from 'react'
import { useNavigate } from 'react-router-dom';

import SignOut from './SignOut'

import { Card } from '@mui/material';

import classes from './Home.module.css';
import Layout from './layout/Layout';
import { getAuth } from 'firebase/auth';

const Home = () => {
  let navigate = useNavigate();

  const navigateToProfile = () => {
    navigate('/ProfilePage');
  };

  if(getAuth().currentUser.emailVerified) return (
      <div>
      <Layout>
      <Card className={classes.card}>
        <h1 className={classes.h1}>Home</h1>
        <button className={classes.button} onClick={navigateToProfile}>Profile</button>
        <SignOut/>
      </Card>
      </Layout>
  </div>
    )
  else return(
    <div>Please verify your email if already verified reload the page!</div>
  )
}

export default Home
