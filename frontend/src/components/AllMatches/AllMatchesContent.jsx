import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LastMatchMessage from './LastMatchMessage';

function AllMatchesContent({ users, currentUserId }) {
  const [userAccepted, setUserAccepted] = useState([]);

  async function getUserInfosMatchedAndAccepted() {
    const requests = users?.map(async (user) => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_URL_API}/one-user/${user.userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        return res.data[0];
      } catch (err) {
        console.log(err);
      }
    });

    const results = await Promise.all(requests);
    setUserAccepted(results.filter(Boolean));
  }

  useEffect(() => {
    getUserInfosMatchedAndAccepted();
  }, [users]);

  // find match where currentuserid === user1_id ou user2_id and push result in a tab

  return (
    <div className='max-w-screen-xl m-auto'>
      <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center'>Liste des matchs acceptés</h1>
      {userAccepted?.map((person) => (
        <div key={person._id} className='flex  gap-5 my-2 py-5 border-b-[1px] border-indigo-500'>
          {person.picture === '' ? (
            <Link to={`/app/match/profil/${person._id}`} title={`Accéder au profil de ${person.pseudo}`}>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/800px-User-avatar.svg.png'
                className='rounded-full w-16 h-16 object-cover max-h-16 max-w-16'
                alt='avatar'
              />
            </Link>
          ) : (
            <Link to={`/app/match/profil/${person._id}`} title={`Accéder au profil de ${person.pseudo}`}>
              <img src={person.picture} className='rounded-full w-16 h-16 max-w-16 max-h-16 object-cover' alt={person.pseudo} />
            </Link>
          )}
          <div className='flex flex-col justify-center w-3/4'>
            {person.match.map((match) => {
              if (match.user1_id === currentUserId || match.user2_id === currentUserId) {
                if (match.accepted) {
                  return (
                    <>
                      <Link to={`/app/match/chat/${match._id}/${currentUserId}/${person._id}`} title={`Accéder à la discussion avec ${person.pseudo}`}>
                        <h2 className='text-base font-bold'>{person.pseudo}</h2>
                      </Link>
                      <Link key={match._id} to={`/app/match/chat/${match._id}/${currentUserId}/${person._id}`} title={`Accéder à la discussion avec ${person.pseudo}`}>
                        <LastMatchMessage matchId={match._id} />
                      </Link>
                    </>
                  );
                }
              }
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllMatchesContent;
