import { useState } from "react";
import { IUser } from "../../../interfaces/User"
import { dataToString } from "../../../shared/dataToString"
import axios from "axios";

const User = ({ user }: { user: IUser }) => {
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);
  const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const token = localStorage.getItem('token');
  
  const handleSetAdmin = (checked: boolean) => {
    setIsAdmin(checked);

    axios.post(`${baseURL}/users/update-admin-status/${user.id}`, {
        isAdmin: checked
    }, 
    {
        headers: {
          Authorization: `Bearer ${token}`,
        }
    })
  }

  return (
    <tr>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>      
            <div className="form-check form-switch d-flex justify-content-center">                     
                <input 
                className="form-check-input border border-black" 
                type="checkbox" 
                role="switch" 
                checked={isAdmin}
                id="flexSwitchCheckDefault" 
                onChange={(e) => handleSetAdmin(e.target.checked)}
                />
            </div>
        </td>
        <td>{dataToString(user.createdAt)}</td>
        <td><a href={`/profile/${user.id}`}>→</a></td>
    </tr>
  )
}

export default User
