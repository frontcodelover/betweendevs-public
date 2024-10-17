import { useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';

export default function Logout() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate('/');
  }

  return (
    <>
      <button className='flex gap-2 items-center text-white hover:text-white bg-indigo-500' onClick={handleLogout}>
        <MdLogout className='text-2xl' />
        <span className='text-base'>Se déconnecter</span>
      </button>
    </>
  );
}
