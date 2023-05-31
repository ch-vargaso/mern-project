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
    map: User | null
    email?: string, //el singo de pregunta significa que puede ser optional...
    name: string,
    username: string,
    avatar: string,
    pets?: any
    about?: string,
    posts?: any,
    _id: string,
    favourites?: any 
    // posts: Posts [] | null
}
interface Pet{
    animal: string,
    name: string,
    owner: string,
}
type Comments = Comment[]

interface Comment {
    author: {
        username: string,
        _id:string
    },
    post: string,
    text: string,
    _id: string,
    createdAt: string,
}

type Pets = Pet[]

interface Post{
    title: string | null, 
    image?: string, 
    sector: string | null,
    address: string | null, 
    tags: [string],
    description: string |null,
    author: {
        username: string | null,
        _id: string
    },
    comments: [Comment],
    _id: string,
    postDate: {
        typte: string | null,
        default: string
    }
    likes: string[]
};

interface commentFormData{
    text: string
}
interface postFormData{
    title: string,
    image: Postimg,
    sector: string,
    address: string,
    tags: any
    description: string,
}





// const userSchema = new mongoose.Schema(
//   {
//     email: { type: String, required: true, unique: true },
//     name: { type: String },
//     username: { type: String },
//     password: { type: String, required: true },
//     pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "pet" }],
//     avatar: { type: String, default: "https://res.cloudinary.com/dxyregqsx/image/upload/v1682681502/user_avatars/placeholder_gik52p.png" },
//     about: { type: String, default: "tell us something about you..." },
//     posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
//     // es posible que la palabra de la subcollection tenga que ser singular...
//   }, { timestamps: true }
// );