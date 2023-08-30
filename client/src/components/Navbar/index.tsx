import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkIsAuthenticated } from "../../shared/authentification/isAuthenticated";
import classes from './style.module.scss';

const Navbar = () => {
  const [user, setUser] = useState(checkIsAuthenticated());
  const navigation = useNavigate();
  const handleLogin = () => { navigation('/auth') };
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(false); 
    window.location.reload();
  }
  //todo /\ remove this /\ and change from PageWrapper(?)
  //todo improve design
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
            <a className="navbar-brand" href="/">Recomendations</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
              data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
              aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
                  <li className="nav-item">
                  {user ? (
                    <button className={classes.btnSignOut} onClick={handleLogout}></button>
                  ) : (
                    <button className={classes.btnSignIn} onClick={handleLogin}></button>
                  )}</li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
