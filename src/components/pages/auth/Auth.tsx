import { Alert, Button, ButtonGroup, Grid, TextField } from "@mui/material";
import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import { IUserData } from "./types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useAuth } from "../../providers/useAuth";
import { useNavigate } from "react-router-dom";

import styles from "./Auth.module.css";



const Auth:FC = () => {
  const { ga, user } = useAuth();

  const [isRegForm, setIsRegForm] = useState(false);
  const [userData, setUserData] = useState<IUserData>({
    email: "",
    password: "",
    name: "",
  } as IUserData);
  const [error, setError] = useState("");

  const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isRegForm) {
      try {
        const res = await createUserWithEmailAndPassword(
          ga,
          userData.email,
          userData.password
        );

        await updateProfile(res.user, {
          displayName: userData.name,
        });
      } catch (error: any) {
        error.message && setError(error.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(ga, userData.email, userData.password);
      } catch (error: any) {
        error.message && setError(error.message);
      }
    }

    console.log(userData.email, userData.password);
    setUserData({
      email: "",
      password: "",
      name: "",
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <>
      {error && (
        <Alert severity="error" style={{ marginBottom: 20 }}>
          {error}
        </Alert>
      )}
      <Grid display="flex" justifyContent="center" alignItems="center">
        <form onSubmit={handleLogin}>
          <TextField
            label="Name"
            variant="outlined"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            sx={{
              display: "block",
              marginBottom: 3,
            }}
          />
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            sx={{
              display: "block",
              marginBottom: 3,
            }}
            required
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            sx={{
              display: "block",
              marginBottom: 3,
            }}
            required
          />
          <div className={styles.btnGroup__wrapper}>
            <Button
              variant="contained"
              type="submit"
              onClick={() => setIsRegForm(false)}
            >
              Авторизация
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={() => setIsRegForm(true)}
            >
              Регистрация
            </Button>
          </div>
        </form>
      </Grid>
    </>
  );
};

export default Auth;
