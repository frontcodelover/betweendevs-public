import jwt_decode from 'jwt-decode';

const isLogged = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwt_decode(token);
    const expirationDate = new Date(decoded.exp * 1000);
    let now = new Date();
    if (expirationDate < now) {
      localStorage.removeItem('token');
    } else {
      return true;
    }
  }
};

export default isLogged;
