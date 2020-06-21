export default function checkTokenValidity() {
  const currentToken = localStorage.getItem('currentToken');
  const tokenExpiresIn = localStorage.getItem('tokenExpiresIn');
  const now = new Date();

  if (!currentToken || !tokenExpiresIn || now.getTime() - tokenExpiresIn.getTime() > 0) {
    return false;
  }

  return true;
}
