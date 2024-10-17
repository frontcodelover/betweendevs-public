import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import './App.css';
import ErrorPage from '../../pages/ErrorPage';
import Layout from '../Layout/Layout';
import Legal from '../../pages/LegalPage';
import Terms from '../../pages/TermsPage';
import Contact from '../../pages/ContactPage';
import About from '../../pages/AboutPage';
import ScrollToTop from '../../utils/ScrollToTop';
import MatchPage from '../../pages/MatchPage';
import AllMatchesPage from '../../pages/AllMatchesPage';
import LoginPage from '../../pages/LoginPage';
import SignUp from '../../pages/SignUpPage';
import ProfilePage from '../../pages/ProfilePage';
import ProfileEditPage from '../../pages/ProfileEditPage';
import ChatPage from '../../pages/ChatPage';
import { ProtectedRoute } from '../../utils/ProtectedRoute';
import ProfileFromChat from '../../pages/ProfileFromChat';
import { AuthContext } from '../../context/Context';

function App() {
  const userID = localStorage.getItem('userID');
  const token = localStorage.getItem('token');

  return (
    <AuthContext.Provider value={token}>
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/mentions-legales' element={<Legal />} />
            <Route path='/conditions-generales-utilisation' element={<Terms />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/a-propos' element={<About />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<SignUp />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/app/match/profil/:id' element={<ProfileFromChat />} />
              <Route path='/app/match-finder' element={<MatchPage />} />
              <Route path='/app/matches' element={<AllMatchesPage />} />
              <Route path='/app/profil' element={<ProfilePage />} />
              <Route path='/app/profil/edit/' element={<ProfileEditPage userID={userID} />} />
              <Route path='/app/match/chat/:matchId/:senderId/:recieverId' element={<ChatPage />} />
            </Route>
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </Layout>
        <ScrollToTop />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
