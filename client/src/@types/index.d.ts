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