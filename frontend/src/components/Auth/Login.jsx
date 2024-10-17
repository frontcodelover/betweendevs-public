import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [messageError, setMessageError] = useState('');
  const [formValue, setformValue] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // make axios post request
      const loginFormData = new FormData();
      loginFormData.append('email', formValue.email);
      loginFormData.append('password', formValue.password);

      const response = await axios.post(`${import.meta.env.VITE_URL_API}/login`, loginFormData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.userId);
      localStorage.setItem('goalsSlug', response.data.goalsSlug);

      navigate('/app/match-finder');
    } catch (error) {
      setMessageError('Identifiant ou mot de passe incorrect');
      console.log(error);
    }
  }

  return (
    <div className='flex justify-center'>
      <div className='p-8 w-full'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-2 mb-10 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center'>Se connecter</h2>
        </div>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                E-mail
              </label>
              <div className='mt-2'>
                <input
                  value={formValue.email}
                  onChange={handleChange}
                  id='email'
                  name='email'
                  type='text'
                  autoComplete='email'
                  required
                  className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
                  Mot de passe
                </label>
                {/* <div className='text-sm'>
                  <a href='#' className='font-semibold text-indigo-600 hover:text-indigo-500'>
                    Mot de passe oublié?
                  </a>
                </div> */}
              </div>
              <div className='mt-2'>
                <input
                  value={formValue.password}
                  onChange={handleChange}
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div className='pt-6'>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Se connecter
              </button>
            </div>
          </form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Pas encore membre?{' '}
            <Link to='/register' className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500' title='Créer un profil'>
              Créez votre profil
            </Link>
          </p>
          <p className='mt-10 text-center text-sm text-red-500'>{messageError}</p>
        </div>
      </div>
    </div>
  );
}
export default Login;
