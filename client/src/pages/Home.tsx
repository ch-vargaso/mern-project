import React, { useEffect, useState } from 'react'

interface User{
  email: string,
  username: string,
  password: string
};
type Users = User[]

function Home() {
  const [users, setUsers] = useState <null| Users> ([]);
  const getUsers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}users/all`);
      const result = await response.json();
      setUsers(result)
      console.log("todos los usuarios: ", result)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
      getUsers();  
    },[]);

  return (
    <div>
      <h1>Home funcionando</h1>
      <div>
        {users && users.map((user, i) => {
          return <p key={i}> {user.username}</p>
        })}
      </div>
    </div>
  )
};

export default Home

//  how can i cancel a process on the terminal? npx kill-port (numero del port...)