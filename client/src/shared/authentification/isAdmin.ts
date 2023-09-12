import { checkIsAuthenticated } from "./isAuthenticated";
import axios from "axios";

export const checkIsAdmin = async () => {
    if (checkIsAuthenticated()) {
        const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
        const token = localStorage.getItem('token');

        return axios.get(`${baseURL}/users/isadmin`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        // })).data.isAdmin
        }).then((res) => {
            return res.data.isAdmin
        })
    } 
    return false
};