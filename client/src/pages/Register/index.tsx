import { FormEvent, useState } from 'react';
import axios from 'axios';
import './util.scss';
import './main.scss'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigate();
  const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(baseURL + '/auth/register', { email, password, username });
      const token = response.data.token;

      localStorage.setItem('token', token);
      navigation('/')
    } catch (error) {
      console.error('Register failed:', error);
    }
  };

  return (
    <>
        <Navbar />
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <form className="login100-form validate-form" onSubmit={handleRegister}>
                        <span className="login100-form-title p-b-43">
                            Register to continue
                        </span>
                        <div className="wrap-input100">
                            <input className="input100" type="text" name="username" 
                                value={username} onChange={(e) => setUsername(e.target.value)}/>
                            <span className="focus-input100"></span>
                            <span className="label-input100">Username</span>
                        </div>
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
                        <div className="container-login100-form-btn">
                            <button className="login100-form-btn" type="submit">
                                Register
                            </button>
                        </div>
                        <div className="text-center p-t-46 p-b-20">
                            <a className="" href={`/auth`}>or login</a>
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

export default Register
