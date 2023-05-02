import { ReactNode, createContext, useState } from 'react'

interface User {
    password: string,
    email?: string, //el singo de pregunta significa que puede ser optional...
    username: string,
    avatar: string,
    pets: string[]
};

interface AuthContextType {
    user: User | null,
    error: Error | null,
    login(email: string, password: string): void,
}

const initialAuth: AuthContextType = {
    user: null,
    error: null,
    login: () => {
        throw new Error('login not implemented...');
    }
};

export const AuthContext = createContext<AuthContextType>(initialAuth);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const login = async (email: string, password: string) => {
        console.log({ email: email, password: password }) 
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        const urlencoded = new URLSearchParams();
        urlencoded.append("email", email);
        urlencoded.append("password", password);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded
        };
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}users/login`, requestOptions);
            const result = await response.json();
            if (result.user) {
                setUser(result.user); 
            }
            console.log("result", result);
        } catch (error) {
            console.log(error)
            // setError(error)
            alert("something went wrong...run!! after check console...")
        }
 
    }


    return (
      <AuthContext.Provider value={{user, error, login}}>
            {children}
      </AuthContext.Provider>
  )
}

export default AuthContext
