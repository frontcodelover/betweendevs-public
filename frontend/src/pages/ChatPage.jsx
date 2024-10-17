import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

import Chat from '../components/Chat/Chat';

function ChatPage() {
  const { senderId, recieverId, matchId } = useParams();
  const userTab = [senderId, recieverId];

  const [userInfos, setUserInfos] = useState([]);

  async function getUserInfosMatchedAndAccepted() {
    const requests = userTab?.map(async (user) => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_URL_API}/one-user/${user}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        return res.data[0];
      } catch (err) {
        console.log(err);
      }
    });

    const results = await Promise.all(requests);
    setUserInfos(results);
  }

  useEffect(() => {
    getUserInfosMatchedAndAccepted();
  }, []);

  return <Chat users={userInfos} senderId={senderId} recieverId={recieverId} matchId={matchId} />;
}

export default ChatPage;
