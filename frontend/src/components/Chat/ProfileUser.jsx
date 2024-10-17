import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdLocationPin } from 'react-icons/md';

function ProfileUser({ id }) {
  const [user, setUser] = useState([]);

  function getUser() {
    axios
      .get(`${import.meta.env.VITE_URL_API}/one-user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}
					`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className='max-w-screen-xl m-auto'>
      {user.map((people) => (
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
                  {' '}
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
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default ProfileUser;
