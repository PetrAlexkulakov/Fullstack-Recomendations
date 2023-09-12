import { useState } from 'react';
import { MultipleFieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './util.scss';
import './main.scss'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { ErrorMessage } from '@hookform/error-message';
import ErrorComponent from '../../components/ErrorComponent';

interface IFormInput {
    username: string
    email: string
    password: string
}

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const { register, formState: { errors }, setError, handleSubmit } = useForm<IFormInput>({
    criteriaMode: "all"
  })
  const navigation = useNavigate();
  const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const handleRegister: SubmitHandler<IFormInput> = async () => {
    try {
      const response = await axios.post(baseURL + '/auth/register', { email, password, username, isAdmin });
      const token = response.data.token;

      localStorage.setItem('token', token);
      navigation('/')
    } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
      
          if (axiosError.response) {
            const statusCode = axiosError.response.status;
            const responseData = axiosError.response.data;
      
            console.error(`Request failed with status ${statusCode}:`, responseData);
      
            if (statusCode === 500) {
                setError('email', { type: 'manual', message: 'This email doesn`t available' })
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
                    <form className="login100-form validate-form" onSubmit={handleSubmit(handleRegister)}>
                        <span className="login100-form-title p-b-43">
                            Register to continue
                        </span>
                        <div className="wrap-input100">
                            <input 
                                className="input100" 
                                type="text" 
                                value={username} 
                                {...register("username", { 
                                    required: "This input is required.", 
                                    maxLength: {
                                      value: 40,
                                      message: "This input can`t exceed 40 characters"
                                    } 
                                })} 
                                onChange={(e) => setUsername(e.target.value)}/>
                            <span className="focus-input100"></span>
                            <span className="label-input100">Username</span>
                        </div>
                        <ErrorMessage
                            errors={errors}
                            name="username"
                            render={({ messages }: { message: string; messages?: MultipleFieldErrors | undefined; }) => {
                            console.log("messages", messages);
                            return messages
                                ? Object.entries(messages).map(([, message]) => {
                                    const uniqueKey = uuidv4();
                                    return <ErrorComponent key={uniqueKey}>{message}</ErrorComponent>
                                })
                                : null;
                            }}
                        />
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
                                value={password} 
                                {...register("password", { 
                                    required: "This input is required.", 
                                    maxLength: {
                                      value: 100,
                                      message: "This input can`t exceed 100 characters"
                                    } 
                                })} 
                                onChange={(e) => setPassword(e.target.value)}/>
                            <span className="focus-input100"></span>
                            <span className="label-input100">Password</span>
                        </div>
                        <ErrorMessage
                            errors={errors}
                            name="password"
                            render={({ messages }: { message: string; messages?: MultipleFieldErrors | undefined; }) => {
                            console.log("messages", messages);
                            return messages
                                ? Object.entries(messages).map(([, message]) => {
                                    const uniqueKey = uuidv4();
                                    return <ErrorComponent key={uniqueKey}>{message}</ErrorComponent>
                                })
                                : null;
                            }}
                        />
                        <div className="form-check form-switch" style={{textAlign: 'left'}}>
                            <input 
                              className="form-check-input border border-black" 
                              type="checkbox" 
                              role="switch" 
                              checked={isAdmin}
                              id="flexSwitchCheckDefault" 
                              onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                                (Dev) Is Admin?
                            </label>
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
