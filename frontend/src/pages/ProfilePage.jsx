import Profile from '../components/User/Profile';

function ProfilePage() {
  const userID = localStorage.getItem('userID');
  const token = localStorage.getItem('token');

  return <Profile user={userID} token={token} />;
}

export default ProfilePage;
