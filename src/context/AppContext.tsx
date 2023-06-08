import React, { Dispatch, SetStateAction, createContext, useState } from 'react'
import { User, colorScheme } from '../utils/Types';

interface AppContext {
    guessedUsers: Array<string>
    setGuessedUsers: Dispatch<SetStateAction<Array<string>>>
    user: User
    setUser: Dispatch<SetStateAction<User>>
    colorScheme: colorScheme
    setColorScheme: Dispatch<SetStateAction<colorScheme>>
}

export const AppContext = createContext<AppContext>({} as AppContext);

export const AppContextProvider = (props) => {
    const [guessedUsers, setGuessedUsers] = useState<Array<string>>([]);
    const [user, setUser] = useState<User>(undefined);
    const [colorScheme, setColorScheme] = useState<colorScheme>("");

    return (
        <AppContext.Provider
            value={{
                guessedUsers, setGuessedUsers, user, setUser, colorScheme, setColorScheme
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}