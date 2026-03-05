import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name:"",
    email:"",
    password:""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/register", form);
      alert("User Registered Successfully");

      navigate("/");

    } catch(err){
      alert(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>User Registration</h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Name"
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />

        <br/>

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

        <button type="submit">Register</button>

      </form>
    </div>
  );
}

export default Register;