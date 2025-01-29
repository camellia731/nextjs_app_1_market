"use client";
import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission
    try {
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch (error) {
      alert("エラーが発生しました。");
      console.error(error);
    }
  };
  return (
    <div>
      <h1 className="page-title">Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          name="name"
          placeholder="Username"
          required
        />
        <input value = {email} onChange={(e) => setEmail(e.target.value)}
        type="text" name="email" placeholder="Email" required />
        <input value = {password} onChange={(e) => setPassword(e.target.value)} 
        type="text" name="password" placeholder="Password" required />
        <button>登録</button>
      </form>
    </div>
  );
};

export default Register;
