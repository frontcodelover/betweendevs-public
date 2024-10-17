import { Link } from 'react-router-dom';

function Logo() {
  return (
    <div className='sm:text-2xl text-xl'>
      <Link to='/' className='font-bold' title="Accès à la page d'accueil">
        <span className=' text-black'>Between</span>
        <span className='text-indigo-600'>Devs{'{}'}</span>
      </Link>
    </div>
  );
}

export default Logo;
