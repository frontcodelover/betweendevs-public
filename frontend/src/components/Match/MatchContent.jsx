import { useState, useRef, useEffect } from 'react';
import { BsFillHandThumbsDownFill, BsFillHandThumbsUpFill } from 'react-icons/bs';
import { MdLocationPin } from 'react-icons/md';
import axios from 'axios';
import Confetti from 'react-confetti';

import ModalSuperMatch from './ModalSuperMatch';

function MatchContent({ token }) {
  const [people, setPeople] = useState({});
  const [next, setNext] = useState(0);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [goConfetti, setGoConfetti] = useState(false);
  const [match, setMatch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [effect, setEffect] = useState(false);
  const confetiRef = useRef(null);

  const goalsSlug = localStorage.getItem('goalsSlug');

  function getUserBySepecialization() {
    axios
      .get(`${import.meta.env.VITE_URL_API}/all-users-by-spe/${goalsSlug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPeople(res.data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setPeople(null);
        }
        console.log(err);
      });
  }

  useEffect(() => {
    getUserBySepecialization();
    if (goConfetti && match) {
      setHeight(confetiRef.current.clientHeight);
      setWidth(confetiRef.current.clientWidth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next, match, goConfetti]);

  const bodyParameters = {
    key: 'value',
  };

  function handleLike() {
    axios
      .post(`${import.meta.env.VITE_URL_API}/create-match/${people._id}`, bodyParameters, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setEffect(true);
        if (res.status === 201) {
          setMatch(true);
          setShowModal(true);
          setGoConfetti(true);
        }
        setTimeout(() => {
          setNext(next + 1);
          setEffect(false);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {people === null ? (
        <div className='flex flex-col items-center justify-center h-screen -mt-24'>
          <h1 className='font-bold'>Désolé.</h1>
          <h2 className='text-2xl font-semibold text-center'>Plus aucun dévs à matcher, revenez plus tard.</h2>
        </div>
      ) : (
        <>
          <div className='max-w-screen-xl m-auto mb-[180px] md:mt-[80px]'>
            {goConfetti && (
              <div className='confettie-wrap' ref={confetiRef}>
                <ModalSuperMatch isOpen={showModal} onClose={() => (setShowModal(false), setGoConfetti(false))} peopleChat={people.pseudo} />
                <Confetti numberOfPieces={150} width={width} height={1000} />
              </div>
            )}
            <>
              <div key={people._id} className='flex md:gap-20 gap-3 flex-col md:flex-row'>
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
                      <div className='text-center font-semibold bg-indigo-500 px-3 rounded text-white'>{people?.specialization?.name}</div>
                      <div className='font-semibold text-center px-3 bg-teal-600 rounded text-white'>{people?.level}</div>
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
          </div>
          <div className='fixed bottom-0 bg-gray-100 w-full -mx-8 no-padding'>
            <div className='max-w-screen-xl m-auto sm:pt-3 py-4'>
              <div className='text-center font-semibold sm:text-xl sm:pt-6 text-lg'>Souhaitez-vous matcher?</div>
              <div className='flex justify-center gap-10 items-center py-3 sm:py-9'>
                <button className='text-white hover:text-white bg-red-600 opacity-75 border-none focus:outline-none hover:border-none' onClick={() => setNext(next + 1)}>
                  <span>
                    <BsFillHandThumbsDownFill className='text-3xl' alt='passer le profil' title='passer le profil' />
                  </span>
                </button>
                <button className={`text-white hover:text-white bg-teal-600 opacity-75 border-none focus:outline-none hover:border-none ${effect && 'animate-wiggle'}`} onClick={handleLike}>
                  <span>
                    <BsFillHandThumbsUpFill className='text-3xl' alt='matcher le profil' title='matcher le profil' />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MatchContent;
