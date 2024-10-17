import MatchContent from '../components/Match/MatchContent';

function MatchPage() {
  const token = localStorage.getItem('token');
  return <MatchContent token={token} />;
}

export default MatchPage;
