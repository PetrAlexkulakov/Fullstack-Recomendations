import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import './util.scss';
import './main.scss'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { SubmitHandler, useForm } from 'react-hook-form';
import ErrorComponent from '../../components/ErrorComponent';
// import { SocialLoginButton } from './SocialLoginButton';

interface IFormInput {
    email: string
    password: string
}

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, formState: { errors }, setError, handleSubmit } = useForm<IFormInput>({
    criteriaMode: "all"
  })
  const navigation = useNavigate();
  const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const handleLogin: SubmitHandler<IFormInput> = async () => {
    try {
      const response = await axios.post(baseURL + '/auth/login', { email, password });
      const token = response.data.token;

      // Сохранение токена в localStorage (в реальных приложениях лучше использовать secure cookie)
      localStorage.setItem('token', token); //* may be change
      navigation('/')
    } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
      
          if (axiosError.response) {
            const statusCode = axiosError.response.status;
            const responseData = axiosError.response.data;
      
            console.error(`Request failed with status ${statusCode}:`, responseData);
      
            if (statusCode === 404) {
                setError('email', { type: 'manual', message: 'This email doesn`t exist' })
            } else if (statusCode === 401) {
                setError('password', { type: 'manual', message: 'Wrong password' })
            }
          } else {
            console.error('Network error:', axiosError.message);
          }
        } else {
          console.error('Other error:', error);
        }
      }
  };

  return (
    <>
        <Navbar />
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <form className="login100-form validate-form" onSubmit={handleSubmit(handleLogin)}>
                        <span className="login100-form-title p-b-43">
                            Login to continue
                        </span>
                        <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                            <input 
                                className="input100"
                                type="email"
                                value={email} 
                                {...register("email", { 
                                    required: "This input is required.", 
                                    maxLength: {
                                      value: 100,
                                      message: "This input can`t exceed 100 characters"
                                    } 
                                })}
                                onChange={(e) => setEmail(e.target.value)}/>
                            <span className="focus-input100"></span>
                            <span className="label-input100">Email</span>
                        </div>
                        {errors.email && (
                            <ErrorComponent>{errors.email.message}</ErrorComponent>
                        )}
                        <div className="wrap-input100 validate-input" data-validate="Password is required">
                            <input 
                                className="input100" 
                                type="password"
                                {...register("password", { 
                                    required: "This input is required.", 
                                    maxLength: {
                                      value: 100,
                                      message: "This input can`t exceed 100 characters"
                                    } 
                                })} 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}/>
                            <span className="focus-input100"></span>
                            <span className="label-input100">Password</span>
                        </div>
                        {errors.password && (
                            <ErrorComponent>{errors.password.message}</ErrorComponent>
                        )}
                        <div className="container-login100-form-btn">
                            <button className="login100-form-btn" type="submit">
                                Login
                            </button>
                        </div>
                        {/* <SocialLoginButton /> */}
                        <div className="text-center p-t-46 p-b-20">
                            <a className="" href={`/register`}>or register</a>
                        </div>
                        {/* <div className="login100-form-social flex-c-m">
                            <a href="#" className="login100-form-social-item flex-c-m bg1 m-r-5">
                                <i className="fa fa-facebook-f" aria-hidden="true"></i>
                            </a>
                            <a href="#" className="login100-form-social-item flex-c-m bg2 m-r-5">
                                <i className="fa fa-twitter" aria-hidden="true"></i>
                            </a>
                        </div> */} //todo
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
