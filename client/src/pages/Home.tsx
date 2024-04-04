import React, { useEffect, useState } from 'react'
import Post from '../components/Post';
import { Link } from 'react-router-dom';
import CustomButton from '../components/CustomButton';



// type Users = User[]
type Posts = Post[]
type Props = {}


function Home(props: Props) {
  // const [users, setUsers] = useState<null | Users>([]);
  const [posts, setPosts] = useState<Posts>([])

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
    <div className='page_container'>
      <div className='content_container' >
        <div className='home_title'>
          <h1 >Welcome to Graffitis</h1>
        </div>
        <div className='home_buttons' >
            <CustomButton link='' text='login as guest'/>
            <CustomButton link='/login' text='login'/>
            <CustomButton link='/register' text='register'/>
        </div>
      </div>

    </div>
  )
};

export default Home

//  how can i cancel a process on the terminal? npx kill-port (numero del port...)