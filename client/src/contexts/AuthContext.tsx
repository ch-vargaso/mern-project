import { ReactNode, createContext, useEffect, useState } from 'react'

// tengo que arreglar typeScript!!!!
interface fetchResult {
    token: string,
    verified: boolean,
    user: User
}

interface fetchFailed {
    error: string
}

interface AuthContextType {
    user: User | null,
    // quitar ese loggedUser!!!!! de todo lado!! 
    error: Error | null,
    login(email: string, password: string): void,
    logout(): void
    fetchActiveUser(token: string): void
}

const initialAuth: AuthContextType = {
    user: null,
    error: null,
    login: () => {
        throw new Error('login not implemented...');
    },
    logout: () => {
        throw new Error('logout not implemented')
    },
    fetchActiveUser:() => {
            throw new Error('fetch user not implemented')
    }
};

export const AuthContext = createContext<AuthContextType>(initialAuth);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null >(null);
    // console.log("user logged in", user)
    const [error, setError] = useState<Error | null>(null);

    const login = async (email: string, password: string) => {
        // console.log({ email: email, password: password }) 
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
            if (response.ok) {
                const result = await response.json() as fetchResult
           
                if (result.user) {
                    setUser(result.user); 
                    console.log("user after login", result.user)
                    localStorage.setItem("token", result.token);
                    // localStorage.setItem("my name", "christian");
                }
                // console.log("result", result); 
            } else {
                const result = await response.json() as fetchFailed
                alert(result.error)
            }
        } catch (error) {
            console.log(error)
            // setError(error)
            alert("something went wrong...run!! after check console...")
        }
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token")
    }
    //  it is better to give always an easy name, becasue it will be easier to handle (it means with no spaces or something like that)
    const checkForToken = () => {
        const token = localStorage.getItem("token")
        if (token) {
            console.log("there is a token")  
            fetchActiveUser(token)
        } else {
            console.log("there is no token")
            setUser(null)
        }
    }

    const fetchActiveUser = async (token: string) => {
        const myHeaders = new Headers();
        // myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDUyNzVhNTkwNmNjNjdmNjRkMThhZGUiLCJtc2ciOiJmdW5jaW9uYW5kbyEhIGNyZWF0aW5nIHRva2VuLi4uIiwiaWF0IjoxNjgzMjEzOTk1LCJleHAiOjE2ODM4MTg3OTV9.beVTPePsYQC_kZtKT-hdMXlp2X6jjpyk8y_d2mWApSM");
        myHeaders.append("Authorization", `Bearer ${token}`);
        const requestOptions = {
            method: 'GET',
            headers: myHeaders
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}users/active`, requestOptions)
            const result = await response.json();
            console.log("active user:", result)
            setUser(result);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        checkForToken()
    }, [])
    

    return (
      <AuthContext.Provider value={{user, error, login, logout, fetchActiveUser}}>
            {children}
      </AuthContext.Provider>
  )
}

export default AuthContext

// for primitive types they need to be lowercasse 