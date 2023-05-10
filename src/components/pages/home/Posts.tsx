import React, { FC, useEffect, useState } from "react";
import { IPost } from "../../../types";
import { Avatar, Box, ImageList, ImageListItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../providers/useAuth";
import { collection, onSnapshot } from "firebase/firestore";
import { initialPosts } from "./initialPosts";
import Card from '../../UserInterface/Card';
import { formatDistance } from "date-fns";
import { ru } from 'date-fns/locale'


const Posts: FC = () => {
  const { db } = useAuth();
  const [posts, setPosts] = useState<IPost[]>(initialPosts);

  // useEffect(() => {
  //   const unsub = onSnapshot(collection(db, "posts"), (doc) => {
  //     doc.forEach((d: any) => {
  //       setPosts((prev) => [d.data(),...prev]);
  //     });
  //   });

  //   useEffect(() => {
  //   const unsub = onSnapshot(collection(db, "posts"), (doc) => {
  //     const newArray:IPost[] = []
  //     doc.forEach((d: any) => {
  //      newArray.push(d.data()) 
  //     });
  //     setPosts(newArray)
  //   });

  //   return () => {
  //     unsub();
  //   };
  // }, []);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "posts"), (doc) => {
      const newArray: IPost[] = [];
      doc.forEach((d: any) => {
        newArray.push(d.data());
      });
      setPosts(newArray.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    });
    
    return () => {
      unsub();
    };
  }, []);


  return (
    <>
      {posts.map((post, idx) => (
        <Card key={`Post-${idx}`}>
          <Link
            key={post.author._id}
            to={`/profile/${post.author._id}`}
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "#111",
              marginBottom: 12,
            }}
          >
            <Box
              sx={{
                position: "relative",
                marginRight: 2,
                width: 50,
                height: 50,
              }}
            >
              <Avatar
                src={post.author.avatar}
                alt=""
                sx={{ width: 46, height: 46, borderRadius: "50%" }}
              />
            </Box>
            <div>
              <div style={{ fontSize: 14 }}>{post.author.name}</div>
              <div style={{ fontSize: 14, opacity: "0.6" }}>
              {/* {post.formattedDate} */}
              {formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true, locale: ru })}
              </div>
            </div>
          </Link>

          <p>{post.content}</p>

          {post.images?.length && (
            <ImageList variant="masonry" cols={3} gap={8}>
              {post.images.map((image) => (
                <ImageListItem key={image}>
                  <img src={image} alt={""} loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Card>
      ))}
    </>
  );
};

export default Posts;




