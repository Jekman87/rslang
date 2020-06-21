export default function checkTokenValidity() {
  const currentToken = localStorage.getItem('currentToken');
  const tokenExpiresIn = Number(localStorage.getItem('tokenExpiresIn'));
  const now = new Date();

  if (!currentToken || !tokenExpiresIn) {
    return false;
  }
  if (now.getTime() - tokenExpiresIn > 0) {
    return false;
  }

  return true;
}
