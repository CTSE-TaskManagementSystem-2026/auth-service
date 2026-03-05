import { useState } from "react";
import API from "../services/api";

function AdminProfile(){

  const [admin,setAdmin] = useState({
    name:"",
    email:"",
    password:""
  });

  const createAdmin = async () => {

    try{

      await API.post("/create-admin",admin);

      alert("New Admin Created");

    }catch(err){

      alert("Error creating admin");

    }

  };

  return(

    <div>

      <h2>Admin Profile</h2>

      <h3>Create New Admin</h3>

      <input
        placeholder="Name"
        onChange={(e)=>setAdmin({...admin,name:e.target.value})}
      />

      <br/>

      <input
        placeholder="Email"
        onChange={(e)=>setAdmin({...admin,email:e.target.value})}
      />

      <br/>

      <input
        type="password"
        placeholder="Password"
        onChange={(e)=>setAdmin({...admin,password:e.target.value})}
      />

      <br/>

      <button onClick={createAdmin}>Create Admin</button>

    </div>
  );
}

export default AdminProfile;