import React, { FC } from "react";
import { useAuth } from "../../providers/useAuth";
import Card from "../../UserInterface/Card";
import { Avatar } from "@mui/material";

const Profile: FC = () => {
  const { user } = useAuth();
  return (
    <Card>
      <Avatar src={user?.avatar} />
      <h1>{user?.name}</h1>
      <p>Возраст: 34 года</p>
      <p>Город: Санкт-Петербург</p>
      <p>Университет: СПбГТУРП</p>
    </Card>
  );
};

export default Profile;
