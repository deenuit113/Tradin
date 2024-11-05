import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    id: string | null;
    email: string | null;
    displayName: string | null;
    photoUrl: string | null;
}

const defaultUser: User = {
    id: null,
    email: null,
    displayName: null,
    photoUrl: null,
};

type LoginType = 'google' | 'kakao' | 'common' | null; // 로그인 타입 정의

const UserContext = createContext<{
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    loginType: LoginType;
    setLoginType: React.Dispatch<React.SetStateAction<LoginType>>; 
}>({
    user: defaultUser,
    setUser: () => {},
    loggedIn: false,
    setLoggedIn: () => {},
    loginType: null,
    setLoginType: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    const [user, setUser] = useState<User>(defaultUser);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [loginType, setLoginType] = useState<LoginType>(null);

    return (
        <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn, loginType, setLoginType }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);