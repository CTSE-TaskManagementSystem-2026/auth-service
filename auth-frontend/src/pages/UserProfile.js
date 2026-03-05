import { useEffect, useState } from "react";
import API from "../services/api";

function UserProfile(){

  const [user,setUser] = useState(null);

  useEffect(()=>{

    API.get("/profile")
      .then(res=>{
        setUser(res.data);
      })
      .catch(()=>{
        alert("Unauthorized");
      });

  },[]);

  if(!user){
    return <h3>Loading...</h3>;
  }

  return(

    <div>

      <h2>User Profile</h2>

      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>

    </div>

  );
}

export default UserProfile;