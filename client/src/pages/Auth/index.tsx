import { FormEvent, useState } from 'react';
import axios from 'axios';
import './util.scss';
import './main.scss'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigate();
  const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(baseURL + '/auth/login', { email, password });
      const token = response.data.token;

      // Сохранение токена в localStorage (в реальных приложениях лучше использовать secure cookie)
      localStorage.setItem('token', token); //todo may be change
      navigation('/')
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <>
        <Navbar />
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <form className="login100-form validate-form" onSubmit={handleLogin}>
                        <span className="login100-form-title p-b-43">
                            Login to continue
                        </span>
                        <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                            <input className="input100" type="text" name="email" 
                                value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <span className="focus-input100"></span>
                            <span className="label-input100">Email</span>
                        </div>
                        <div className="wrap-input100 validate-input" data-validate="Password is required">
                            <input className="input100" type="password" name="pass" 
                                value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <span className="focus-input100"></span>
                            <span className="label-input100">Password</span>
                        </div>
                        <div className="flex-sb-m w-full p-t-3 p-b-32">
                            <div>
                                <a href="#" className="txt1">
                                    Forgot Password?
                                </a>
                            </div>
                        </div>
                        <div className="container-login100-form-btn">
                            <button className="login100-form-btn" type="submit">
                                Login
                            </button>
                        </div>
                        <div className="text-center p-t-46 p-b-20">
                            <span className="txt2">
                                or sign up using
                            </span>
                        </div>
                        <div className="login100-form-social flex-c-m">
                            <a href="#" className="login100-form-social-item flex-c-m bg1 m-r-5">
                                <i className="fa fa-facebook-f" aria-hidden="true"></i>
                            </a>
                            <a href="#" className="login100-form-social-item flex-c-m bg2 m-r-5">
                                <i className="fa fa-twitter" aria-hidden="true"></i>
                            </a>
                        </div>
                    </form>
                    <div className="login100-more">
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Auth
