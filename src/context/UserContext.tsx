import React, { Dispatch, SetStateAction, createContext, useState } from 'react'
import { User } from '../utils/Types';

interface UserContext {
    user: User
    setUser: Dispatch<SetStateAction<User>>;
}


export const UserContext = createContext<UserContext>({} as UserContext);

export const UserContextProvider = (props) => {
    const [user, setUser] = useState<User>(undefined);

    return (
        <UserContext.Provider
            value={{
                user, setUser
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}