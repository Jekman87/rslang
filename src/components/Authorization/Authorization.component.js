import $$ from '../../core/domManipulation';
import { clearRegister, clearLogin } from './clearAuthorization';
import createAuthorizationForm from './authorization.template';
import createUser from './asyncCreateUser';
import loginUser from './asyncLoginUser';
import destroyAuthorization from './destroyAuthorization';
import startMainApp from '../../main';

export default class Authorization {
  constructor() {
    this.authorizationWrapper = $$.create('div', 'container').$el;
    this.authorizationWrapper.style.marginTop = '7%';
    this.authorizationWrapper.insertAdjacentHTML('afterbegin', createAuthorizationForm());
    this.app = document.getElementById('app');
  }

  async onSubmitRegisterForm(event) {
    event.preventDefault();
    clearLogin();

    const user = document.getElementById('registerName').value;
    const password = document.getElementById('registerPassword').value;

    try {
      await createUser({
        email: `${user}`,
        password: `${password}`,
      });

      const loginUserResponse = await loginUser({
        email: `${user}`,
        password: `${password}`,
      });

      localStorage.setItem('currentToken', loginUserResponse.token);
      localStorage.setItem('tokenExpiresIn', loginUserResponse.tokenExpiresIn);
      destroyAuthorization();
      startMainApp();
    } catch {
      document.querySelector('.alert-error-register').classList.remove('d-none');
      setTimeout(clearRegister, 2000);
    }
  }

  async onSubmitLoginForm(event) {
    event.preventDefault();
    clearRegister();

    document.querySelector('.alert-error-login').classList.add('d-none');

    const user = document.getElementById('loginName').value;
    const password = document.getElementById('loginPassword').value;

    try {
      const loginUserResponse = await loginUser({
        email: `${user}`,
        password: `${password}`,
      });

      localStorage.setItem('currentToken', loginUserResponse.token);
      localStorage.setItem('tokenExpiresIn', loginUserResponse.tokenExpiresIn);
      destroyAuthorization();
      startMainApp();
    } catch {
      document.querySelector('.alert-error-login').classList.remove('d-none');
    }
  }

  onClickChangeFormLink(event) {
    event.preventDefault();

    document.querySelector('.login-form').classList.toggle('d-none');
    document.querySelector('.register-form').classList.toggle('d-none');
  }

  // == INIT + ADD LISTENERS
  render() {
    this.app.append(this.authorizationWrapper);

    this.registerForm = document.querySelector('.register-form');
    this.registerForm.onsubmit = this.onSubmitRegisterForm;

    this.loginForm = document.querySelector('.login-form');
    this.loginForm.onsubmit = this.onSubmitLoginForm;

    this.changeFormLinks = document.querySelectorAll('.change-form-link');
    this.changeFormLinks.forEach((link) => {
      link.addEventListener('click', this.onClickChangeFormLink);
    });
  }
}
