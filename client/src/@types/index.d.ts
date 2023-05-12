type Avatar = string | File

interface SubmitRegisterData {
    email: string,
    username: string,
    password: string
    avatar: Avatar
}

interface SubmitLoginData {
    email: string,
    password: string
}

interface User {
    email?: string, //el singo de pregunta significa que puede ser optional...
    username: string,
    avatar: string,
    pets: string[]
}