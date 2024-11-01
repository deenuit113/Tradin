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

const UserContext = createContext<{
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    user: defaultUser,
    setUser: () => {},
    loggedIn: false,
    setLoggedIn: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    const [user, setUser] = useState<User>(defaultUser);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const login = (newUser: User) => {
        setUser(newUser);
        setLoggedIn(true);
    };

    const logout = () => {
        setUser(defaultUser);
        setLoggedIn(false);
    };

    return (
        <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);