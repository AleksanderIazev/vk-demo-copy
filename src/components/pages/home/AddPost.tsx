import { Alert, Box, TextField } from "@mui/material";
import React, { FC, useState, KeyboardEvent } from "react";
import { useAuth } from "../../providers/useAuth";
import { addDoc, collection, orderBy, query } from "firebase/firestore";
import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";

const AddPost: FC = () => {
  const [content, setContent] = useState<string>("");
  const { user, db } = useAuth();
  const [error, setError] = useState("");

  //Время поста

  const addPostHandler = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && user) {
      try {
        const now = new Date();
        const postCreatedAt = now.toISOString();

        const formattedDate = formatDistance(new Date(postCreatedAt), now, {
          addSuffix: true,
          locale: ru,
        });

        await addDoc(collection(db, "posts"), {
          author: user,
          content,
          createdAt: postCreatedAt,
          formattedDate,
        });
      } catch (e: any) {
        setError(e);
      }

      setContent("");
    }
  };
  return (
    <>
      {error && (
        <Alert severity="error" style={{ marginBottom: 20 }}>
          {error}
        </Alert>
      )}
      <Box
        sx={{
          border: "1px solid #e2e2e2",
          borderRadius: "10px",
          padding: 2,
        }}
      >
        <TextField
          label="Расскажи, что у тебя нового"
          variant="outlined"
          InputProps={{
            sx: {
              borderRadius: "25px",
              backgroundColor: "#F9F9F9",
            },
          }}
          sx={{
            width: "100%",
          }}
          onKeyPress={addPostHandler}
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
      </Box>
    </>
  );
};

export default AddPost;
