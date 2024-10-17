import { MdLocationPin } from 'react-icons/md';
import { BsFillPencilFill, BsXLg } from 'react-icons/bs';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Logout from '../Auth/Logout';
import ModalConfirmation from './ModalConfirmation';

function Profile({ user }) {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  function getUser() {
    axios
      .get(`${import.meta.env.VITE_URL_API}/one-user/${user}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}
					`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function confirmDeleteAccount(e) {
    e.preventDefault();
    setShowModal(true);
  }

  useEffect(() => {
    getUser();
    if (confirmDelete) {
      handleDelete();
    }
  }, [user, confirmDelete]);

  async function handleDelete() {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_URL_API}/delete-user/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      localStorage.clear();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='max-w-screen-xl m-auto'>
      <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl pb-8 text-center'>Votre profil</h1>

      {data.map((people) => (
        <>
          <div key={people._id} className='flex md:gap-20 gap-5 flex-col md:flex-row'>
            <div className='flex flex-col items-center md:w-1/3'>
              {people?.picture ? (
                <>
                  <img src={people?.picture} className='rounded-full sm:w-40 sm:h-40 w-32 h-32 object-cover md:w-60 md:h-60' alt={people.pseudo} />
                  <h2 className='text-2xl py-4 font-semibold'>{people?.pseudo}</h2>
                </>
              ) : (
                <>
                  <img
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/800px-User-avatar.svg.png'
                    className='rounded-full sm:w-40 sm:h-40 w-32 h-32 object-cover md:w-60 md:h-60'
                    alt='avatar'
                  />
                  <h2 className='text-2xl py-4 font-semibold'>{people?.pseudo}</h2>
                </>
              )}

              <div>
                <div className='flex gap-2 justify-center mb-3'>
                  <div className='text-center font-semibold bg-indigo-500 px-3 rounded text-white'>{people.specialization.name}</div>
                  <div className='font-semibold text-center px-3 bg-teal-600 rounded text-white'>{people.level}</div>
                </div>
                <span className='flex justify-center'>
                  <MdLocationPin className='mt-1' /> {people.city}
                </span>
              </div>
            </div>
            <div className='flex flex-col gap-4 sm:gap-6 md:w-2/3'>
              <h3 className='text-md font-semibold -mb-2 sm:text-2xl'>Description</h3>
              <div className='text-justify text-gray-500 text-base sm:text-lg'>{people.description}</div>
              <h3 className='text-md font-semibold -mb-2 sm:text-lg'>Technologies maitrisées</h3>
              <div className='flex gap-2 flex-wrap'>
                {people?.technology?.map((techno) => (
                  <p key={techno._id} className='bg-gray-200 py-1 px-2 rounded'>
                    {techno.name}
                  </p>
                ))}
              </div>
              <div>
                <h3 className='text-md font-semibold sm:text-lg'>Statut</h3>
                <p>{people.status}</p>
              </div>
              <div className='pt-5 md:pt-10'>
                {' '}
                <div className='flex md:justify-end justify-center gap-5 items-center flex-wrap'>
                  <Link to='/app/profil/edit/'>
                    <button className='flex gap-2 items-center text-white hover:text-white bg-emerald-500'>
                      <BsFillPencilFill className='text-2xl' />
                      <span>Modifier le profil</span>
                    </button>
                  </Link>
                  <Logout />
                  <button className='flex gap-2 items-center text-white hover:text-white bg-red-600' onClick={confirmDeleteAccount}>
                    <BsXLg className='text-2xl' />
                    <span>Supprimer mon compte</span>
                  </button>
                </div>
                {showModal && <ModalConfirmation isOpen={showModal} onClose={() => setShowModal(false)} setConfirmDelete={setConfirmDelete} />}
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default Profile;
