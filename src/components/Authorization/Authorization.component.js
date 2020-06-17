/* eslint-disable quotes */
/* eslint-disable class-methods-use-this */
import creatingHelper from '../../HelpFunctions/createElementsHelper';
import { clearRegister, clearLogin } from './clearAuthorization';
import createAuthorizationForm from './authorization.template';
import createUser from './asyncCreateUser';
import loginUser from './asyncLoginUser';

export default class Authorization {
  constructor() {
    this.authorizationWrapper = creatingHelper('div', 'container-fluid');
    this.authorizationWrapper.insertAdjacentHTML('afterbegin', createAuthorizationForm());
  }

  async onSubmitRegisterForm(event) {
    event.preventDefault();
    clearLogin();

    const user = document.getElementById('registerName').value;
    const password = document.getElementById('registerPassword').value;
    const createdUser = await createUser({ email: `${user}`, password: `${password}` });

    if (createdUser.error) {
      document.querySelector('.alert-error-register').classList.remove('d-none');
    } else {
      document.querySelector('.alert-success-register').classList.remove('d-none');
    }

    setTimeout(clearRegister, 2000);
  }

  async onSubmitLoginForm(event) {
    event.preventDefault();
    clearRegister();

    document.querySelector('.alert-error-login').classList.add('d-none');

    const user = document.getElementById('loginName').value;
    const password = document.getElementById('loginPassword').value;

    const loginUserResponse = await loginUser({ email: `${user}`, password: `${password}` });

    if (loginUserResponse.message === 'Authenticated') {
      localStorage.setItem('currentToken', loginUserResponse.token);

      while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
      }
    } else {
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
    document.body.append(this.authorizationWrapper);

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
