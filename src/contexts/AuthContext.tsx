import { DTOUser } from "@dtos/userdto";
import { ReactNode, createContext } from "react";



export type AuthContextDataProps = {
  user: DTOUser;
}

type authContextProviderProps = {
  children: ReactNode
}
export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }:authContextProviderProps) {
  return (
    <AuthContext.Provider value={{
      user: {
        id: '1',
        name: 'Daniel',
        email: 'daniel@email.com',
        avatar: 'daniel.png'
      }
      
    }}>
    {children}
    </AuthContext.Provider>
  );
}