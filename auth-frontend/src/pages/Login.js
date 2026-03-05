import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login(){

  const navigate = useNavigate();

  const [form,setForm] = useState({
    email:"",
    password:""
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try{

      const res = await API.post("/login",form);

      localStorage.setItem("token",res.data.token);
      localStorage.setItem("role",res.data.role);

      if(res.data.role === "admin"){
        navigate("/admin");
      }else{
        navigate("/profile");
      }

    }catch(err){
      alert("Invalid Credentials");
    }
  };

  return(
    <div>

      <h2>User Login</h2>

      <form onSubmit={handleLogin}>

        <input
          placeholder="Email"
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />

        <br/>

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setForm({...form,password:e.target.value})}
        />

        <br/>

        <button type="submit">Login</button>

      </form>

    </div>
  );
}

export default Login;