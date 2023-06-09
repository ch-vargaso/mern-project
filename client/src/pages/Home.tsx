import React, { useEffect, useState } from 'react'
import Post from '../components/Post';



// type Users = User[]
type Posts = Post[]
type Props = {}


function Home( props: Props) {
  // const [users, setUsers] = useState<null | Users>([]);
  const [posts, setPosts] = useState< Posts>([])
  // const getUsers = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_BASE_URL}users/all`);
  //     const result = await response.json();
  //     setUsers(result)
  //     console.log("todos los usuarios: ", result)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  const getAllPosts = async () => {
    const requestOptions = {
      method: 'GET',
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}posts/all`, requestOptions);
      const result = await response.json();
      setPosts(result)
      console.log("todos los posts", result)
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

    useEffect(() => {
      // getUsers();  
      getAllPosts();
  }, []);






  return (
    <div>
      <div>
        <h2 className='home_title' >Last Posts</h2>
      </div>
           
      <div className='posts-page-container' >
        {posts && posts.map((post: Post) => {
          return(
            <>
              < Post key={post._id} user_post={post} /> 
            </>
          )
        })}
      </div>
    </div>
  )
};

export default Home

//  how can i cancel a process on the terminal? npx kill-port (numero del port...)