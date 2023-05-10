import React, { FC, useEffect, useState, MouseEvent } from "react";
import { useAuth } from "../../providers/useAuth";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { IMessage } from "../../../types";
import {
  Alert,
  Avatar,
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import Card from "../../UserInterface/Card";

const Messages: FC = () => {
  const { user, db } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "messages"), (doc) => {
      const array: IMessage[] = [];
      doc.forEach((d: any) => {
        array.push(d.data());
      });
      setMessages(
        array.sort(
          (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()
        )
      );
    });

    return () => {
      unsub();
    };
  }, []);

  const addMessageHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      await addDoc(collection(db, "messages"), {
        user,
        message,
        data: Date.now(),
      });
    } catch (e: any) {
      setError(e);
    }

    setMessage("");
  };

  const handleAddMessage = async () => {
    try {
      await addDoc(collection(db, "messages"), {
        user,
        message,
        data: Date.now(),
      });
    } catch (e: any) {
      setError(e);
    }

    setMessage("");
  };

  //отправка с помощью Enter

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddMessage();
    }
  };
  return (
    <>
      {error && (
        <Alert severity="error" style={{ marginBottom: 20 }}>
          {error}
        </Alert>
      )}

      <Card>
        <List style={{ height: "65vh", overflowY: "auto" }}>
          {messages.map((msg, idx) => (
            <ListItem key={idx}>
              <Grid
                container
                sx={msg.user._id === user?._id ? { textAlign: "right" } : {}}
              >
                <Grid
                  display="flex"
                  justifyContent={
                    msg.user._id === user?._id ? "flex-end" : "flex-start"
                  }
                  item
                  xs={12}
                >
                  <Avatar src={msg.user.avatar} />
                </Grid>
                <Grid item xs={12}>
                  <ListItemText
                    style={
                      msg.user._id === user?._id ? { color: "#1976d2" } : {}
                    }
                    primary={msg.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ListItemText secondary={msg.user.name} />
                </Grid>
                <Grid item xs={12}>
                  <ListItemText
                    secondary={new Date(msg.data).toLocaleDateString()}
                  />
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Grid container style={{ padding: "20px" }}>
          <Grid item xs={10}>
            <TextField
              id="outlined-basic-email"
              label="Напиши что-нибудь"
              fullWidth
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              value={message}
            />
          </Grid>
          <Grid item xs={1} style={{ paddingLeft: "20px" }}>
            <Fab color="primary" onClick={addMessageHandler}>
              <SendIcon />
            </Fab>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default Messages;
