import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <div className=' bg-gray-100 -mb-8'>
        <div className='max-w-2xl mx-auto text-black py-10'>
          <div className='text-center'>
            <h3 className='sm:text-3xl mb-3 text-2xl'> L'app de rencontre pour les devs </h3>
            <p> Chercher, matcher, échanger. </p>
          </div>
          <hr className='w-1/2 m-auto mt-6 border-indigo-600' />
          <div className='mt-6 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-600'>
            <p className='order-2 md:order-1 mt-8 md:mt-0'> &copy; Fait avec amour en 2023. </p>
            <div className='order-1 md:order-2'>
              <Link to='/a-propos' className='px-2' title='A propos'>
                A propos
              </Link>
              <Link to='/contact' className='px-2 border-l' title='Contact'>
                Contact
              </Link>
              <Link to='/mentions-legales' className='px-2 border-l' title='Mentions légales'>
                Mentions légales
              </Link>
              <Link to='/conditions-generales-utilisation' className='px-2 border-l' title="Conditions générales d'utilisation">
                CGU
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
