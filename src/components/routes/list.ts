import React from "react";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import Messages from "../pages/messages/Messages";
import Conversation from "../pages/messages/Conversation";
import Friends from "../pages/friends/Friends";
import Auth from "../pages/auth/Auth";

export type RouteType = {
  path: string;
  element: React.FC;
  end?: boolean;
  auth?: boolean;
};

export const routes: RouteType[] = [
  { path: "/", element: Home,end: true, auth: true },
  { path: "/profile", element: Profile, auth: true },
  {
    path: "/messages",
    element: Messages,
    end: true,
    auth: true,
  },
  { path: "/message/:id", element: Conversation, auth: true },
  { path: "/friends/:id", element: Friends, auth: true },
  {
    path: "/auth",
    element: Auth,
    end: true,
    auth: false,
  },
];