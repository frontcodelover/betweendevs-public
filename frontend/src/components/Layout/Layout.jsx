import { useLocation } from 'react-router-dom';

import Logo from './Header/Logo';
import Navbar from './Header/Navbar';
import Footer from './Footer/Footer';
import isLogged from '../../utils/IsLogged';

function Layout({ children }) {
  const location = useLocation();
  const appPages = location.pathname.includes(`/app/match/chat/`);
  const appMatchFinder = location.pathname.includes(`/app/match-finder`);
  const user = isLogged();

  return (
    <div id='page'>
      <div id='header' className='fixed bg-white w-full top-0 z-50 px-8'>
        <div className='flex h-[10vh] max-w-screen-xl w-screen-xl m-auto pt-5 justify-between'>
          <div>
            <Logo />
          </div>
          <div>{user && <Navbar />}</div>
        </div>
      </div>
      <div id='content' className='mt-[80px] sm:p-8 px-8 py-5'>
        {children}
      </div>
      {appPages || appMatchFinder ? null : (
        <div id='footer'>
          {' '}
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Layout;
