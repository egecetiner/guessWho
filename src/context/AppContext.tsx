import React, { Dispatch, SetStateAction, createContext, useState } from 'react'
import { User, colorScheme } from '../utils/Types';

interface AppContext {
    user: User
    setUser: Dispatch<SetStateAction<User>>
    colorScheme: colorScheme
    setColorScheme: Dispatch<SetStateAction<colorScheme>>
}

export const AppContext = createContext<AppContext>({} as AppContext);

export const AppContextProvider = (props) => {
    const [user, setUser] = useState<User>(undefined);
    const [colorScheme, setColorScheme] = useState<colorScheme>("");

    return (
        <AppContext.Provider
            value={{
                user, setUser, colorScheme, setColorScheme
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}