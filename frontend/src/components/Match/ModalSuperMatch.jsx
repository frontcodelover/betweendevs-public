import { Link } from 'react-router-dom';

function ModalSuperMatch({ isOpen, onClose }) {
  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClose}
      id='wrapper'
      className='fixed top-0 inset-0 bg-black bg-opacity-10 flex justify-center items-center overflow-x-hidden overflow-y-auto z-50 outline-none focus:outline-none'
    >
      <div className='bg-white p-10 rounded-md fixed z-51 w-2/3 flex flex-col'>
        <h2 className='text-3xl font-bold text-center pb-6'>BRAVO 🎉</h2>
        <div className='my-2'>Vous avez un Super match ce qui signifie que vous allez pouvoir discuter avec l'autre membre !</div>
        <Link to='/app/matches' className='text-center text-indigo-500 underline' title='Commencer à discuter'>
          <button className='bg-indigo-500 text-white px-3 py-2 rounded-md text-center justify-center mt-5'> Discuter maintenant </button>
        </Link>
      </div>
    </div>
  );
}

export default ModalSuperMatch;
