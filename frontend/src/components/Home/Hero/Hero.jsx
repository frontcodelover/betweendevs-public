/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom';

import ImageDevHero from '../../../assets/devHero.svg';
import isLogged from '../../../utils/IsLogged';

function Hero() {
  const user = isLogged();

  return (
    <div className='flex flex-col h-[90vh] md:flex-row'>
      <div className='relative isolate'>
        <div className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80' aria-hidden='true'></div>
        <div className='mx-auto max-w-2xl py-20 sm:py-48 lg:py-56'>
          <div className='text-center md:text-left'>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 xl:text-5xl md:text-4xl'>L'application créée par des devs pour des devs</h1>
            <p className='mt-6 text-lg leading-8 text-gray-600'>Rencontrez des devs qui partagent vos centres d'intérêt ou qui sont à la recherche d'un projet à réaliser en équipe.</p>
            <div className='mt-10 flex items-center justify-center gap-x-6 md:justify-start'>
              {!user ? (
                <>
                  <Link
                    to='/register'
                    className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
                    title='inscription'
                  >
                    Inscription
                  </Link>
                  <Link
                    to='/login'
                    className='rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-500 shadow-sm border border-indigo-500 hover:bg-indigo-100 hover:text-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600'
                    title='connexion'
                  >
                    Connexion
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to='/app/match-finder'
                    className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
                    title='Trouver un match'
                  >
                    Trouver un match
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='relative flex items-center'>
        <img src={ImageDevHero} alt='Banniere développeur' className='object-contain' />
      </div>
    </div>
  );
}
export default Hero;
