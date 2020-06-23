import $$ from '../../core/domManipulation';
import Component from '../../core/Component';
import { clearRegister, clearLogin } from './clearAuthorization';
import createAuthorizationForm from './authorization.template';
import createUser from './asyncCreateUser';
import loginUser from './asyncLoginUser';
import { storage } from '../../core/utils';

export default class Authorization extends Component {
  static className = 'Authorization';

  constructor($root, options) {
    super($root, {
      name: 'Authorization',
      listeners: ['click'],
      ...options,
    });

    this.onSubmitLoginForm = this.onSubmitLoginForm.bind(this);
    this.onSubmitRegisterForm = this.onSubmitRegisterForm.bind(this);
    // бинды можно будет удалить после перехода на клик
  }

  onClick(event) {
    const clickedElement = $$(event.target);
    // тут делаем проверку на какой именно элемент кликнули
    // например через дата атрибут, или через класс
    // и в зависимости от этого вызываем нужную функцию
    // this.submitForm например

    if (clickedElement.hasClass('btn')) {
      console.log(clickedElement);
    }
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

      storage('currentToken', loginUserResponse.token);
      storage('currentToken', loginUserResponse.userId);
      storage('tokenExpiresIn', loginUserResponse.tokenExpiresIn);


      // localStorage.setItem('currentToken', loginUserResponse.token);
      // localStorage.setItem('tokenExpiresIn', loginUserResponse.tokenExpiresIn);

      this.emit('selectPage', 'MainPage');
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

      storage('currentToken', loginUserResponse.token);
      storage('userId', loginUserResponse.userId);
      storage('tokenExpiresIn', loginUserResponse.tokenExpiresIn);

      // localStorage.setItem('currentToken', loginUserResponse.token);
      // localStorage.setItem('tokenExpiresIn', loginUserResponse.tokenExpiresIn);

      this.emit('selectPage', 'MainPage');
    } catch {
      document.querySelector('.alert-error-login').classList.remove('d-none');
    }
  }

  onClickChangeFormLink(event) {
    event.preventDefault();

    document.querySelector('.login-form').classList.toggle('d-none');
    document.querySelector('.register-form').classList.toggle('d-none');
  }

  init() {
    super.init();
    // если кроме click нет других событий и нет никаких слушателей
    // метод init можно удалить

    this.registerForm = document.querySelector('.register-form');
    this.registerForm.onsubmit = this.onSubmitRegisterForm;

    this.loginForm = document.querySelector('.login-form');
    this.loginForm.onsubmit = this.onSubmitLoginForm;

    this.changeFormLinks = document.querySelectorAll('.change-form-link');
    this.changeFormLinks.forEach((link) => {
      link.addEventListener('click', this.onClickChangeFormLink);
    });
  }

  toHTML() {
    return createAuthorizationForm().trim();
  }
}
