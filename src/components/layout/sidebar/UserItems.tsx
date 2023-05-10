import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import React, { FC } from "react";
import { IUser } from "../../../types";

export const users:IUser[] = [
  {
    avatar:
      "https://pyxis.nymag.com/v1/imgs/654/1f1/08de774c11d89cb3f4ecf600a33e9c8283-24-keanu-reeves.rsquare.w700.jpg",
    name: "Александр Язев",
    isOnline: true,
    _id: 'fgrggr'
  },
  {
    avatar:
      "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg",
    name: "Дмитрий Песков",
    isOnline: true,
    _id: 'rewfw'
  },
  {
    avatar:
      "https://media.istockphoto.com/id/1357723739/photo/studio-portrait-of-a-smiling-young-latin-woman.jpg?b=1&s=170667a&w=0&k=20&c=RIMvJI9S1mZytKJydukxUF4hRoyVbR1W3ix6gsdo72I=",
    name: "Мария Яковлева",
    isOnline: false,
    _id: 'wrwrwr'
  },
  {
    avatar:
      "https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg",
    name: "Елена Васильевна",
    isOnline: true,
    _id: 'tytyt'
  },
];

const UserItems: FC = () => {
  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      sx={{
        padding: 2,
        backgroundColor: "#F1F7FA",
        border: "none",
        borderRadius: 3,
      }}
    >
      {users.map((user) => (
        <Link
          key={user._id}
          to={`/profile/${user._id}`}
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "#111",
            marginBottom: 12,
          }}
        >
          <Box
            sx={{ position: "relative", marginRight: 2, width: 50, height: 50 }}
          >
            <Avatar
              src={user.avatar}
              alt=""
              sx={{ width: 46, height: 46, borderRadius: "50%" }}
            />
            {user.isOnline && (
              <Box
                sx={{
                  backgroundColor: "#4FB14F",
                  border: "2px solid #F1F7FA",
                  width: 11,
                  height: 11,
                  position: "absolute",
                  bottom: 2,
                  left: 32,
                  borderRadius: "50%",
                }}
              />
            )}
          </Box>

          <span style={{ fontSize: 14 }}>{user.name}</span>
        </Link>
      ))}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/messages")}>
            <ListItemIcon>
              <QuestionAnswerIcon />
            </ListItemIcon>
            <ListItemText primary="Сообщения" />
          </ListItemButton>
        </ListItem>
      </List>
    </Card>
  );
};
export default UserItems;
