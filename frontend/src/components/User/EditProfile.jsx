import { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoWarning } from 'react-icons/io5';

export default function EditProfile() {
  const token = localStorage.getItem('token');
  const userID = localStorage.getItem('userID');
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const [formValue, setformValue] = useState({
    pseudo: '',
    email: '',
    city: '',
    picture: '',
    description: '',
    status: '',
    level: '',
    goals: '',
    technology: [],
    specialization: '',
  });

  const setValue = useCallback(async () => {
    await axios
      .get(`${import.meta.env.VITE_URL_API}/one-user/${userID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}
  `,
        },
      })
      .then((res) => {
        setUser(res.data[0]);
        setLoading(false);
        setformValue({
          pseudo: res.data[0].pseudo,
          email: res.data[0].email,
          city: res.data[0].city,
          picture: res.data[0].picture,
          description: res.data[0].description,
          status: res.data[0].status,
          level: res.data[0].level,
          goals: res.data[0].goals.name,
          technology: res.data[0].technology,
          specialization: res.data[0].specialization.name,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setValue();
  }, []);

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
    setformValue({
      ...formValue,
      technology: technos,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('formValue', formValue);
    try {
      const signupFromData = new FormData();
      Object.entries(formValue).forEach(([key, value]) => {
        if (key === 'technology') {
          value.forEach((techno, index) => {
            if (techno.label) {
              signupFromData.append(`technology[${index}][label]`, techno.label);
              return;
            }
            signupFromData.append(`technology[${index}][label]`, techno.name);
          });
        } else {
          signupFromData.append(key, value);
        }
      });

      const response = await axios.put(`${import.meta.env.VITE_URL_API}/update-user/`, signupFromData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/app/profil');
      localStorage.setItem('goalsSlug', response.data.goals.slug);
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.message[0].message);
      }
      console.log(error);
    }
  }

  console.log('ERRROR', errorMessage);
  return (
    <>
      {!loading ? (
        <div className='flex justify-center'>
          <div className='p-8 w-full'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
              <h2 className='mt-2 mb-10 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center'>Mettre à jour votre profil</h2>
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
                        type='text'
                        name='pseudo'
                        id='pseudo'
                        autoComplete='pseudo'
                        required
                        className='pl-2 block h-[38px] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6'
                        placeholder=''
                      />
                    </div>

                    <label htmlFor='about' className='block text-sm font-medium leading-6 text-gray-900 mt-4'>
                      E-mail <span className='text-red-600'>*</span>
                    </label>

                    <div>
                      <input
                        value={user.email}
                        onChange={handleChangeInput}
                        type='text'
                        id='email'
                        name='email'
                        autoComplete='email'
                        disabled
                        className='pl-2 block w-full  h-[38px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6'
                      />
                    </div>

                    <label htmlFor='city' className='block text-sm font-medium leading-6 text-gray-900 mt-4'>
                      Ville
                    </label>
                    <div>
                      <input
                        // placeholder={user.city}
                        value={formValue?.city}
                        onChange={handleChangeInput}
                        id='city'
                        name='city'
                        type='text'
                        autoComplete='city'
                        className='pl-2 block w-full  h-[38px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6'
                      />
                    </div>

                    <label htmlFor='level' className='block text-sm font-medium leading-6 text-gray-900 mt-4'>
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
                        className='px-2 h-[115px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-ba'
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
                        value={formValue?.picture}
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
                        className='basic-single'
                        classNamePrefix='select'
                        name='specialization'
                        defaultValue={{ label: user.specialization.name, value: user.specialization.value }}
                        options={[
                          { label: 'Full-Stack', value: 'Full-Stack', name: 'specialization', slug: 'fullstack' },
                          { label: 'Back-End', value: 'Back-End', name: 'specialization', slug: 'backend' },
                          { label: 'Front-End', value: 'Front-End', name: 'specialization', slug: 'frontend' },
                        ]}
                        onChange={(option) => handleChangeSelect(option)}
                        required={true}
                      />
                    </div>

                    <label htmlFor='status' className='block text-sm font-medium leading-6 text-gray-900 py-2'>
                      Statut
                    </label>
                    <div>
                      <Select
                        className='basic-single'
                        classNamePrefix='select'
                        name='status'
                        defaultValue={{ label: user.status, value: user.status }}
                        options={[
                          { label: 'En recherche', value: 'En recherche', name: 'status' },
                          { label: 'En poste', value: 'En poste', name: 'status' },
                          { label: 'En formation', value: 'En formation', name: 'status' },
                        ]}
                        onChange={(option) => handleChangeSelect(option)}
                      />
                    </div>

                    <label htmlFor='level' className='block text-sm font-medium leading-6 text-gray-900 py-2'>
                      Niveau
                    </label>
                    <div>
                      <Select
                        className='basic-single'
                        classNamePrefix='select'
                        name='level'
                        defaultValue={{ label: user.level, value: user.level }}
                        options={[
                          { label: 'Débutant', value: 'Débutant', name: 'level' },
                          { label: 'Intermédiaire', value: 'Intermédiaire', name: 'level' },
                          { label: 'Expert', value: 'Expert', name: 'level' },
                        ]}
                        onChange={(option) => handleChangeSelect(option)}
                      />
                    </div>

                    <label htmlFor='technology' className='block text-sm font-medium leading-6 text-gray-900 py-2'>
                      Technologies
                    </label>
                    <div>
                      <Select
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        name='technology'
                        isMulti
                        defaultValue={user.technology.map((techno) => {
                          return { label: techno.name, value: techno._id };
                        })}
                        options={technologiesListing}
                        onChange={(option) => technologyOptionsChange(option)}
                      />
                    </div>

                    <label htmlFor='goals' className='block text-sm font-medium leading-6 text-gray-900 py-2'>
                      Je recherche un dev... <span className='text-red-600'>*</span>
                    </label>
                    <div>
                      <Select
                        className='basic-single'
                        classNamePrefix='select'
                        name='goals'
                        defaultValue={{ label: user.goals.name, value: user.goals.name }}
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

                  <div className='pt-6'>
                    <button
                      type='submit'
                      className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                      Enregistrer
                    </button>
                  </div>
                  {errorMessage && (
                    <div className='text-center mt-3 flex text-red-600'>
                      <IoWarning className='mt-1 mr-2' />
                      <span className='font-bold'>{errorMessage}</span>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center h-screen'>LOADING...</div>
      )}
    </>
  );
}
