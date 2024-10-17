import { BsFillStarFill } from 'react-icons/bs';
import { FaUserCog } from 'react-icons/fa';
import { RiFileSearchFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div className='flex gap-3'>
      <NavLink to='/app/match-finder' title='Trouver un match'>
        {({ isActive, isPending }) => (
          <span className={isActive ? 'text-indigo-600' : 'text-gray-600'}>
            <RiFileSearchFill className='sm:text-4xl text-3xl p-1' />
          </span>
        )}
      </NavLink>
      <NavLink to='/app/matches' title='Accéder à vos matches'>
        {({ isActive, isPending }) => (
          <span className={isActive ? 'text-indigo-600' : 'text-gray-600'}>
            <BsFillStarFill className='sm:text-4xl text-3xl p-1' />
          </span>
        )}
      </NavLink>
      <NavLink to='/app/profil' title='Accéder à votre profil'>
        {({ isActive, isPending }) => (
          <span className={isActive ? 'text-indigo-600' : 'text-gray-600'}>
            <FaUserCog className='sm:text-4xl text-3xl p-1' />
          </span>
        )}
      </NavLink>
    </div>
  );
}

export default Navbar;
