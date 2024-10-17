function ConfirmModal({ isOpen, onClose, setConfirmDelete }) {
  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose();
  };

  if (!isOpen) return null;

  return (
    <div onClick={handleClose} id='wrapper' className='fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center overflow-x-hidden overflow-y-auto z-50 outline-none focus:outline-none'>
      <div className='bg-white p-8 rounded-md fixed z-51 md:w-1/6 w-1/2 flex flex-col'>
        <h2 className='text-xl font-bold text-center pb-3'> Voulez-vous bloquer l'utilisateur ?</h2>
        <div className='my-2 font-semibold'>Cette action est irréversible !</div>
        <button onClick={() => setConfirmDelete(true)} className='bg-red-600 text-white rounded-md p-2 mt-4'>
          Oui
        </button>
        <button onClick={onClose} className='bg-green-600 text-white rounded-md p-2 mt-4'>
          Non
        </button>
      </div>
    </div>
  );
}

export default ConfirmModal;
