import React, {
  FC,
  createContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import { IUser, TypeSetState } from "../../types";
import { getAuth, onAuthStateChanged, Auth } from "firebase/auth";
import {getFirestore, Firestore} from 'firebase/firestore'
import { users } from "../layout/sidebar/dataUsers";


interface IContext {
  user: IUser | null
  setUser: TypeSetState<IUser | null>
  ga: Auth
  db:Firestore
}

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const auth = getAuth();
  const db = getFirestore();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser)
        setUser({
          _id: authUser.uid,
          avatar: users[0].avatar,
          name: authUser.displayName || "",
        })
        else{
          setUser(null)
        }
    });
    return unsubscribe;
  }, [auth]);

  const values = useMemo(
    () => ({
      user,
      setUser,
      ga: auth,
      db
    }),
    [user,auth,db]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
