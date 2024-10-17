import { useEffect, useState } from 'react';
import axios from 'axios';
import { limitTextSize } from '../../utils/LimitTextSize';
import parse from 'html-react-parser';

function LastMatchMessage({ matchId }) {
  const [lastMessage, setLastMessage] = useState('');

  async function getLastMessage(matchId) {
    console.log('matchId', matchId);
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL_API}/get-last-message/${matchId}`);
      if (response.status === 200 && response.data[0].message !== '') {
        console.log('response.data', response.data);
        return setLastMessage(response.data[0].message);
      }
      //return setLastMessage("Vous n'avez pas encore échangé avec cette personne. Commencez à discuter");
    } catch (err) {
      console.log(err);
      return setLastMessage("Vous n'avez pas encore échangé avec cette personne.");
    }
  }

  useEffect(() => {
    getLastMessage(matchId);
  }, [matchId]);

  return <div className='text-gray-500'>{parse(limitTextSize(lastMessage, 50))}</div>;
}

export default LastMatchMessage;
