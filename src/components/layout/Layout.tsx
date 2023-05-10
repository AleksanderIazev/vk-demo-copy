import React, { FC, ReactNode } from "react";
import Grid from "@mui/material/Grid";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import { useAuth } from "../providers/useAuth";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  const {user} = useAuth()
  return (
    <>
      <Header />
      <Grid container spacing={2} paddingX={5} marginTop={2}>
        {user && 
        <Grid item md={2.5}>
          <Sidebar />
        </Grid>}
        <Grid item md={user ? 9 : 12}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default Layout;
