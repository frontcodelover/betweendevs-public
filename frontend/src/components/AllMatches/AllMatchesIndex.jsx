import { useEffect, useState } from 'react';
import axios from 'axios';
import AllMatchesContent from './AllMatchesContent';

function AllMatchesIndex() {
  const userId = localStorage.getItem('userID');
  const [allMatches, setAllMatches] = useState([]);

  let userAccepted = [];

  async function getAllMatchesForOneUser() {
    await axios
      .get(`${import.meta.env.VITE_URL_API}/one-user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setAllMatches(res.data[0].match);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAllMatchesForOneUser();
  }, [userId]);

  allMatches.map((match) => {
    if (match.accepted && !match.blocked) {
      if (match.user1_id === userId) {
        userAccepted.push({ userId: match.user2_id, matchId: match._id });
      } else {
        userAccepted.push({ userId: match.user1_id, matchId: match._id });
      }
    }
  });

  return (
    <>
      <AllMatchesContent users={userAccepted} currentUserId={userId} />
    </>
  );
}

export default AllMatchesIndex;
