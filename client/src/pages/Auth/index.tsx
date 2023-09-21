import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import './util.scss';
import './main.scss'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { SubmitHandler, useForm } from 'react-hook-form';
import ErrorComponent from '../../components/ErrorComponent';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const handleLogin: SubmitHandler<IFormInput> = async () => {
    try {
      const response = await axios.post(baseURL + '/auth/login', { email, password });
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
                            {t('LoginTo')}
                        </span>
                        <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                            <input 
                                className="input100"
                                type="email"
                                value={email} 
                                {...register("email", { 
                                    required: t('InputReq'), 
                                    maxLength: {
                                      value: 100,
                                      message: `${t('InputCant')} 100 ${t('characters')}`
                                    } 
                                })}
                                onChange={(e) => setEmail(e.target.value)}/>
                            <span className="focus-input100"></span>
                            <span className="label-input100">{t('Email')}</span>
                        </div>
                        {errors.email && (
                            <ErrorComponent>{errors.email.message}</ErrorComponent>
                        )}
                        <div className="wrap-input100 validate-input" data-validate="Password is required">
                            <input 
                                className="input100" 
                                type="password"
                                {...register("password", { 
                                    required: t('InputReq'), 
                                    maxLength: {
                                      value: 100,
                                      message: `${t('InputCant')} 100 ${t('characters')}`
                                    } 
                                })} 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}/>
                            <span className="focus-input100"></span>
                            <span className="label-input100">{t('Password')}</span>
                        </div>
                        {errors.password && (
                            <ErrorComponent>{errors.password.message}</ErrorComponent>
                        )}
                        <div className="container-login100-form-btn">
                            <button className="login100-form-btn" type="submit">
                                Login
                            </button>
                        </div>
                        <div className="text-center p-t-46 p-b-20">
                            <a className="" href={`/register`}>or register</a>
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
