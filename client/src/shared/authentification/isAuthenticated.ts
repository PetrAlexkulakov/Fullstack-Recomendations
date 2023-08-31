import jwtDecode from "jwt-decode";

export const checkIsAuthenticated = () => {
    const token = localStorage.getItem('token');

    if (token) {
        const decodedToken: { exp: number} = jwtDecode(token);
        const expirationTimestamp = decodedToken.exp;
        
        if (expirationTimestamp * 1000 < Date.now()) {
            localStorage.removeItem('token');
            return false;
        }
        return true;
    }
    return false;
};