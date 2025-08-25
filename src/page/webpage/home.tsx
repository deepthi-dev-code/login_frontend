import React, { useState } from "react";
import axios from "axios";
import homepageImg from "../../assests/homeimage.png";
import "./Homepage.css"; // import css file

function Homepage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [userDatacreate, setUserDatacreate] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res: any = await axios.post(
        "https://login-backend-1-zh0o.onrender.com/api/users",
        formData
      );
      setMessage("✅ User created successfully!");
      setUserDatacreate(res.data.user);
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      setMessage("❌ Failed to create user");
      setUserDatacreate(null);
    }
  };

  const handleGetUsers = async () => {
    try {
      const res: any = await axios.get(
        "https://login-backend-1-zh0o.onrender.com/api/users"
      );
      setUsers(res.data);
      setMessage("✅ Users fetched successfully!");
    } catch (err) {
      setMessage("❌ Failed to fetch users");
      setUsers([]);
    }
  };

  return (
    <div className="homepage">
      {/* Top Section */}
      <div className="top-section">
        {/* Form Left Side */}
        <div className="form-container">
          <h2>Create User</h2>
          <form onSubmit={handleSubmitUser}>
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
            <div className="new-user">
              <h3>✅ New User Created</h3>
              <p><strong>ID:</strong> {userDatacreate.id}</p>
              <p><strong>Name:</strong> {userDatacreate.name}</p>
              <p><strong>Email:</strong> {userDatacreate.email}</p>
            </div>
          )}
        </div>

        {/* Image Right Side */}
        <div className="image-container">
          <img src={homepageImg} alt="homepage visual" />
        </div>
      </div>

      {/* Table Section */}
      <div className="table-section">
        <h2>All Data from Database</h2>
        <button onClick={handleGetUsers} className="fetch-btn">Fetch Users</button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Homepage;
