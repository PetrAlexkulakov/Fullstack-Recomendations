import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkIsAuthenticated } from "../../shared/authentification/isAuthenticated";
import classes from './style.module.scss';
import Translation from "./Translation";
import { useTranslation } from "react-i18next";
import  BurgerMenu  from 'react-burger-menu'

const Navbar = () => {
  const Menu = BurgerMenu['slide'];
  const isSmall = window.innerWidth > 750 ? false : true;
  const { t } = useTranslation();
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
        {isSmall ?
          <Menu 
            className="bg-dark w-50"
            disableAutoFocus
            // width={ '20%' }
            customBurgerIcon={ 
              <img src="../src/assets/list.svg" alt='menu' />
            } 
            right
            styles={{
              bmBurgerButton: {
                width: '100%',
              },
              bmItemList: {
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              },
              bmMenuWrap: {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
              },
              bmOverlay: {
                background: 'rgba(0, 0, 0, 0)'
              }
            }}
          >
            <a className="nav-link mb-1" href="/">{t('Home')}</a>
            {user ? (
                <button className={classes.btnSignOut + ' mb-1'} onClick={handleLogout}/>
              ) : (
                <button className={classes.btnSignIn + ' mb-1'} onClick={handleLogin}/>
            )}
            <Translation className="w-50" />
            {user && (
              <a href="/profile"><button className={classes.btnProfile}/></a>
            )}
          </Menu>
          :
          <>
            <div className="collapse navbar-collapse me-2" id="navbarSupportedContent">
              <ul className="d-flex align-items-center gap-3 navbar-nav ms-auto mb-2 mb-lg-0" style={{alignItems: "center"}}>
                <li className="nav-item"><a className="nav-link" href="/">{t('Home')}</a></li>
                <li className="nav-item">
                {user ? (
                  <button className={classes.btnSignOut} onClick={handleLogout}/>
                ) : (
                  <button className={classes.btnSignIn} onClick={handleLogin}/>
                )}</li>
                <li><Translation /></li>
              </ul>
            </div>
            {user && (
              <a href="/profile"><button className={classes.btnProfile}/></a>
            )}
          </>
        }
      </div>
    </nav>
  )
}

export default Navbar
