import axios from "axios";
import { useEffect, useState } from "react"
import { IUser } from "../../interfaces/User";
import Navbar from "../../components/Navbar";
import User from "./User";

const Admin = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`${baseURL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then((res) => {
      setUsers(res.data)
    })
  })

  return (
    <>
      <Navbar />
      <div className="card shadow mb-4" style={{height: '100%'}}>
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold">All Users</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <User key={index} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </div> 
      </div> 
    </>
  )
}

export default Admin
