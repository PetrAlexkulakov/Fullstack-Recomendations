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
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container me-0">
        <a className="navbar-brand" href="/">Recomendations</a>
        <div className="collapse navbar-collapse me-2" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0" style={{alignItems: "center"}}>
            <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
            <li className="nav-item">
            {user ? (
              <button className={classes.btnSignOut} onClick={handleLogout}/>
            ) : (
              <button className={classes.btnSignIn} onClick={handleLogin}/>
            )}</li>
          </ul>
        </div>
        {user && (
          <a href="/profile"><button className={classes.btnProfile}/></a>
        )}
      </div>
    </nav>
  )
}

export default Navbar
