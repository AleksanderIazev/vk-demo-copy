import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Dispatch, SetStateAction } from "react";

export type TypeSetState<T> = Dispatch<SetStateAction<T>>;

export interface IUser {
  avatar: string;
  name: string;
  isOnline?: boolean;
  _id: string;
}

export interface IPost {
  author: IUser;
  // createdAt: string;
  createdAt: any;
  content: string;
  images?: string[];
  formattedDate: string;
}

export interface IMenuItem {
  title: string
  link: string
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {muiName:string}
}

export interface IMessage {
  user: any;
  userID: IUser
  message:string,
  data: Date
}