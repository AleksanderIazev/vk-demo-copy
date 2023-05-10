import React, { FC, useState } from "react";
import { Search } from "@mui/icons-material";

import styles from "./Header.module.css";

import logoImg from "./png-transparent-vk-chat-logo-social-social-media-social-media-logos-icon-thumbnail.png";
import { useAuth } from "../../providers/useAuth";
import { Button } from "@mui/material";

const Header: FC = () => {
  const {user,ga} = useAuth()
  const [isSearchActive, setIsSearchActive] = useState(false);
  return (
    <header className={styles.header}>
      <div className={styles["image-wrapper"]}>
        <img src={logoImg} alt="" />
      </div>
     {user ? <div className={styles.wrapper}>
        {!isSearchActive && <Search />}

        <input type="text" placeholder="Поиск" onClick={()=> setIsSearchActive(true)}/>
      </div> : ''}
    </header>
  );
};

export default Header;


