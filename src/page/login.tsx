import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
}

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users on component mount
    const fetchUsers = async () => {
      try {
        const res:any = await axios.get("https://login-backend-1-zh0o.onrender.com/api/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users.");
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res:any = await axios.post(
        "https://login-backend-1-zh0o.onrender.com/api/login",
        formData
      );
      setMessage(res.data.message);
      if (res.data.users) {
        navigate("/home");
      }
    } catch (err) {
      setMessage("❌ Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      {/* Left Panel */}
      <div className="left-panel">
        <h1>Welcome to website</h1>
         <p>
          Please login to continue.  
          Manage your account, explore new features, and stay connected.
        </p>

        <div className="user-list">
          <h3> Registered Users</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="right-panel">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>USER LOGIN</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          

          <button type="submit">LOGIN</button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
