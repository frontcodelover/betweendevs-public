import { Link } from 'react-router-dom';
import isLogged from '../../../utils/IsLogged';

function ContentSection() {
  const user = isLogged();
  return (
    <div className=' bg-gray-200 -mx-8 mt-8 -mb-8 p-12'>
      <div className='lg:pr-4'>
        <div className=' text-center'>
          <h3 className='mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center'>Commencez dès maintenant</h3>
          {!user ? (
            <Link to='/register' title="S'inscrire gratuitement">
              <button className='mt-6 text-sm leading-8 bg-indigo-600 text-white'>Inscrivez-vous gratuitement</button>
            </Link>
          ) : (
            <Link to='/app/match-finder' title='Trouver un match'>
              <button className='mt-6 text-sm leading-8 bg-indigo-600 text-white'>Trouver un match</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContentSection;
