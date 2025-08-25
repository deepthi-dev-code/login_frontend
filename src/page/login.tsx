import React, { useState } from "react";
import axios from "axios";
import "./Login.css"; // ✅ Import CSS file

interface User {
  id: number;
  name: string;
  email: string;
}

function Login() {
  const [formData, setFormData] = useState({name: "", email: "", password: "" });
  const [message, setMessage] = useState<string | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [userDatacreate, setUserDatacreate] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res:any = await axios.post("https://login-backend-1-zh0o.onrender.com/api/login", formData);
      setMessage(res.data.message);
      setUserData(res.data.user);
    } catch (err) {
      setMessage("❌ Invalid email or password");
      setUserData(null);
    }
  };
 const handleSubmitUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res: any = await axios.post("https://login-backend-1-zh0o.onrender.com/api/users", formData);
      setMessage("✅ User created successfully!");
      setUserDatacreate(res.data.user);
      setFormData({ name: "", email: "", password: "" }); // clear form
    } catch (err) {
      setMessage("❌ Failed to create user");
      setUserDatacreate(null);
    }
  };

  const handleGetUsers = async () => {
    try {
      const res:any = await axios.get("https://login-backend-1-zh0o.onrender.com/api/users");
      setUsers(res.data);
      setMessage("✅ Users fetched successfully!");
    } catch (err) {
      setMessage("❌ Failed to fetch users");
      setUsers([]);
    }
  };

  return (
    <div className="container">
      {/* Login Form */}
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>

        {message && <p className="message">{message}</p>}

        {userData && (
          <div className="user-data">
            <h3>✅ User Data</h3>
            <p><strong>ID:</strong> {userData.id}</p>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
          </div>
        )}
      </div>
 <div className="container">
      {/* Create User Form */}
      <div className="create-box">
        <form onSubmit={handleSubmitUser}>
          <h2>Create User</h2>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Create</button>
        </form>

        {message && <p className="message">{message}</p>}

        {userDatacreate && (
          <div className="user-data">
            <h3>✅ New User in Created</h3>
            <p><strong>ID:</strong> {userDatacreate.id}</p>
            <p><strong>Name:</strong> {userDatacreate.name}</p>
            <p><strong>Email:</strong> {userDatacreate.email}</p>
          </div>
        )}
      </div>
    </div>
      {/* Fetch Users */}
      <div className="users-box">
        <h2>All Data from Database</h2>
        <button onClick={handleGetUsers}>Fetch Users</button>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Email</th>
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
  );
}

export default Login;
