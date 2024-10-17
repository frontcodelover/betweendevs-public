import { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoWarning } from 'react-icons/io5';

function SignUp() {
  const [formValue, setformValue] = useState({
    pseudo: '',
    email: '',
    city: '',
    password: '',
    confirmPassword: '',
    picture: '',
    description: '',
    status: '',
    level: '',
    goals: '',
    technology: [],
    specialization: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleChangeSelect = (e) => {
    setformValue({
      ...formValue,
      [e.name]: e.value,
    });
  };

  const handleChangeInput = (e) => {
    setformValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const animatedComponents = makeAnimated();

  let technologiesListing = [];

  // console.log('statut', status);

  async function fetchTechnologies() {
    await fetch(`${import.meta.env.VITE_URL_API}/all-techno`)
      .then((response) => response.json())
      .then((data) => {
        data.map((techno) => {
          technologiesListing.push({
            value: techno._id,
            label: techno.name,
          });
        });
      });
  }

  fetchTechnologies();

  const technologyOptionsChange = (technos) => {
    // setTechno(technos);
    setformValue({
      ...formValue,
      technology: technos,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // make axios post request
      const signupFromData = new FormData();
      signupFromData.append('pseudo', formValue.pseudo);
      signupFromData.append('email', formValue.email);
      signupFromData.append('city', formValue.city);
      signupFromData.append('password', formValue.password);
      signupFromData.append('confirmPassword', formValue.confirmPassword);
      signupFromData.append('picture', formValue.picture);
      signupFromData.append('description', formValue.description);
      signupFromData.append('status', formValue.status);
      signupFromData.append('level', formValue.level);
      signupFromData.append('goals', formValue.goals);
      formValue.technology.forEach((techno, index) => {
        signupFromData.append(`technology[${index}][label]`, techno.label);
      });
      signupFromData.append('specialization', formValue.specialization);

      const response = await axios.post(`${import.meta.env.VITE_URL_API}/create-user`, signupFromData);
      console.log('RESPONSE', response);
      navigate('/login');
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.message[0].message);
      }
      console.log(error);
    }
  }

  console.log('ERRROR', errorMessage);
  return (
    <div className='flex justify-center'>
      <div className='p-8 w-full'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-2 mb-10 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center'>S'inscrire</h2>
        </div>

        <div className='sm:mx-auto sm:w-full sm:max-w-md '>
          <h3 className='mt-2 mb-10 text-xs font-light tracking-tight text-gray-900 sm:text-xs text-right'>
            {' '}
            Les champs avec <span className='text-red-600'>*</span> sont obligatoires
          </h3>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-md'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='gap-10'>
              <div className='md:w-full'>
                <label htmlFor='pseudo' className='block text-sm font-medium leading-6 text-gray-900 py-2'>
                  Pseudo <span className='text-red-600'>*</span>
                </label>
                <div>
                  <input
                    value={formValue.pseudo}
                    onChange={handleChangeInput}
                    id='pseudo'
                    name='pseudo'
                    type='text'
                    autoComplete='pseudo'
                    required
                    className='pl-2 block h-[38px] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6'
                  />
                </div>
                <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900 py-2'>
                  E-mail <span className='text-red-600'>*</span>
                </label>
                <div>
                  <input
                    value={formValue.email}
                    onChange={handleChangeInput}
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                    className='pl-2 block w-full  h-[38px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6'
                  />
                </div>
                <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900 py-2'>
                  Mot de passe <span className='text-red-600'>*</span>
                </label>
                <div>
                  <input
                    value={formValue.password}
                    onChange={handleChangeInput}
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    // required
                    className='pl-2 block w-full  h-[38px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6'
                  />
                </div>{' '}
                <label htmlFor='confirmPassword' className='block text-sm font-medium leading-6 text-gray-900 py-2'>
                  Confirmation du mot de passe <span className='text-red-600'>*</span>
                </label>
                <div>
                  <input
                    value={formValue.confirmPassword}
                    onChange={handleChangeInput}
                    id='confirmPassword'
                    name='confirmPassword'
                    type='password'
                    autoComplete='current-password'
                    required
                    className='pl-2 block w-full  h-[38px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6'
                  />
                </div>{' '}
                <label htmlFor='city' className='block text-sm font-medium leading-6 text-gray-900 py-2'>
                  Ville
                </label>
                <div>
                  <input
                    value={formValue.city}
                    onChange={handleChangeInput}
                    id='city'
                    name='city'
                    type='text'
                    autoComplete='city'
                    className='pl-2 block w-full  h-[38px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6'
                  />
                </div>
                <label htmlFor='description' className='block text-sm font-medium leading-6 text-gray-900 py-2'>
                  Description
                </label>
                <div>
                  <textarea
                    value={formValue.description}
                    onChange={handleChangeInput}
                    id='description'
                    name='description'
                    type='textarea'
                    autoComplete='description'
                    className='px-2 h-[115px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-bas'
                  />
                </div>
              </div>

              <div className='md:w-full'>
                <label htmlFor='picture' className='block  text-sm font-medium leading-6 text-gray-900 py-2'>
                  Photo de profil
                </label>
                <div>
                  <input
                    placeholder='Indiquez le lien de votre photo'
                    value={formValue.picture}
                    onChange={handleChangeInput}
                    id='picture'
                    name='picture'
                    type='picture'
                    autoComplete='picture'
                    className='pl-2 block w-full  h-[38px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6'
                  />
                </div>
                <label htmlFor='specialization' className='block text-sm font-medium leading-6 text-gray-900 py-2'>
                  Je suis dév... <span className='text-red-600'>*</span>
                </label>
                <div>
                  <Select
                    placeholder='Votre spécialisation'
                    className='basic-single'
                    classNamePrefix='select'
                    name='specialization'
                    options={[
                      { label: 'Full-Stack', value: 'Full-Stack', name: 'specialization', slug: 'fullstack' },
                      { label: 'Back-End', value: 'Back-End', name: 'specialization', slug: 'backend' },
                      { label: 'Front-End', value: 'Front-End', name: 'specialization', slug: 'frontend' },
                    ]}
                    onChange={(option) => handleChangeSelect(option)}
                    required={true}
                    // value={formValue.specialization}
                  />
                </div>
                <label htmlFor='status' className='block text-sm font-medium leading-6 text-gray-900 py-2'>
                  Statut
                </label>
                <div>
                  <Select
                    placeholder='Votre situation'
                    className='basic-single'
                    classNamePrefix='select'
                    name='status'
                    options={[
                      { label: 'En recherche', value: 'En recherche', name: 'status' },
                      { label: 'En poste', value: 'En poste', name: 'status' },
                      { label: 'En formation', value: 'En formation', name: 'status' },
                    ]}
                    // onChange={(option) => setStatus(option)}
                    onChange={(option) => handleChangeSelect(option)}
                    // required={true}
                  />
                </div>
                <label htmlFor='level' className='block text-sm font-medium leading-6 text-gray-900 py-2'>
                  Niveau
                </label>
                <div>
                  <Select
                    placeholder='Votre niveau'
                    className='basic-single'
                    classNamePrefix='select'
                    name='level'
                    options={[
                      { label: 'Débutant', value: 'Débutant', name: 'level' },
                      { label: 'Intermédiaire', value: 'Intermédiaire', name: 'level' },
                      { label: 'Expert', value: 'Expert', name: 'level' },
                    ]}
                    onChange={(option) => handleChangeSelect(option)}
                    // required={true}
                    // value={formValue.level}
                  />
                </div>
                <label htmlFor='technologies' className='block text-sm font-medium leading-6 text-gray-900 py-2'>
                  Technologies
                </label>
                <div>
                  <Select
                    placeholder='Vos technologies'
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    name='technologies'
                    isMulti
                    options={technologiesListing}
                    onChange={(option) => technologyOptionsChange(option)}
                    // required={true}
                    // value={formValue.technologies}
                  />
                </div>
                <label htmlFor='goals' className='block text-sm font-medium leading-6 text-gray-900 py-2'>
                  Je recherche un dev... <span className='text-red-600'>*</span>
                </label>
                <div>
                  <Select
                    placeholder='Type de profil recherché'
                    className='basic-single'
                    classNamePrefix='select'
                    name='goals'
                    options={[
                      { label: 'Full-Stack', value: 'Full-Stack', name: 'goals' },
                      { label: 'Back-End', value: 'Back-End', name: 'goals' },
                      { label: 'Front-End', value: 'Front-End', name: 'goals' },
                      { label: 'Sans préférence', value: 'Tout', name: 'goals' },
                    ]}
                    onChange={(option) => handleChangeSelect(option)}
                    required={true}
                    // value={formValue.goals}
                  />
                </div>
              </div>
            </div>

            <div className='pt-6'>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                S'inscrire
              </button>
            </div>
            {errorMessage && (
              <div className='text-center mt-3 flex text-red-600'>
                <IoWarning className='mt-1 mr-2' />
                <span className='font-bold'>{errorMessage}</span>
              </div>
            )}
          </form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Déjà membre?{' '}
            <Link to='/login' className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500' title='Se connecter'>
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
