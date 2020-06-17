function clearRegister() {
  document.getElementById('registerName').value = '';
  document.getElementById('registerPassword').value = '';
  document.querySelector('.alert-success-register').classList.add('d-none');
  document.querySelector('.alert-error-register').classList.add('d-none');
}

function clearLogin() {
  document.getElementById('loginName').value = '';
  document.getElementById('loginPassword').value = '';
  document.querySelector('.alert-error-login').classList.add('d-none');
  // document.querySelector('.login-result-success').innerText = '';
  // document.querySelector('.login-result-failure').innerText = '';
}

export { clearRegister, clearLogin };
