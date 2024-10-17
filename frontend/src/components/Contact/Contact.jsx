/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { useForm } from '@formspree/react';
import { Switch } from '@headlessui/react';
import { Link } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Contact() {
  const [agreed, setAgreed] = useState(false);
  const [state, handleSubmit] = useForm('mjvdlpge');
  if (state.succeeded) {
    return (
      <div className='mx-auto max-w-screen-xl text-left'>
        <h1 className='mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl text-left'>Contactez-nous</h1>
        <p className='mt-2 text-lg leading-8 text-gray-600'>Merci pour votre message, il sera traité dans les plus brefs délais.</p>
      </div>
    );
  }

  return (
    <div className='isolate bg-white lg:px-8'>
      <div className='absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]' aria-hidden='true'></div>
      <div className='mx-auto max-w-screen-xl text-left'>
        <h1 className='mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl text-left'>Contactez-nous</h1>
        <p className='mt-2 text-lg leading-8 text-gray-600'>Une question, un besoin, une remarque ? Remplissez ce formulaire.</p>
      </div>
      <form className='mx-auto mt-16 max-w-screen-xl sm:mt-20' onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
          <div>
            <label htmlFor='first-name' className='block text-sm font-semibold leading-6 text-gray-900'>
              Prénom
            </label>
            <div className='mt-2.5'>
              <input
                type='text'
                name='first-name'
                id='first-name'
                autoComplete='given-name'
                className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>
          <div>
            <label htmlFor='last-name' className='block text-sm font-semibold leading-6 text-gray-900'>
              Nom
            </label>
            <div className='mt-2.5'>
              <input
                type='text'
                name='last-name'
                id='last-name'
                autoComplete='family-name'
                className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>
          <div className='sm:col-span-2'>
            <label htmlFor='email' className='block text-sm font-semibold leading-6 text-gray-900'>
              Email
            </label>
            <div className='mt-2.5'>
              <input
                type='email'
                name='email'
                id='email'
                autoComplete='email'
                className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>
          <div className='sm:col-span-2'>
            <label htmlFor='phone-number' className='block text-sm font-semibold leading-6 text-gray-900'>
              Numéro de téléphone
            </label>
            <div className='relative mt-2.5'>
              <input
                type='number'
                name='phone-number'
                id='phone-number'
                autoComplete='tel'
                className='block w-full rounded-md border-0 px-3.5 py-2 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>
          <div className='sm:col-span-2'>
            <label htmlFor='message' className='block text-sm font-semibold leading-6 text-gray-900'>
              Message
            </label>
            <div className='mt-2.5'>
              <textarea
                name='message'
                id='message'
                rows={4}
                className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                defaultValue={''}
              />
            </div>
          </div>
          <Switch.Group as='div' className='flex gap-x-4 sm:col-span-2'>
            <div className='flex h-6 items-center'>
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className={classNames(
                  agreed ? 'bg-indigo-600' : 'bg-gray-200',
                  'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                )}
              >
                <span className='sr-only'></span>
                <span
                  aria-hidden='true'
                  className={classNames(agreed ? 'translate-x-3.5' : 'translate-x-0', 'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out')}
                />
              </Switch>
            </div>
            <Switch.Label className='text-sm leading-6 text-gray-600'>
              J'accepte la politique de confidentialité et{' '}
              <Link to='/conditions-generales-utilisation' className='font-semibold text-indigo-600'>
                les conditions générales d'utilisation
              </Link>
              .
            </Switch.Label>
          </Switch.Group>
        </div>
        <div className='mt-10'>
          <button
            type='submit'
            className='block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Envoyer mon message
          </button>
        </div>
      </form>
    </div>
  );
}
