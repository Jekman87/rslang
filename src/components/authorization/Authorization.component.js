import $$ from '../../core/domManipulation';
import Component from '../../core/Component';
import { clearRegister, clearLogin } from './clearAuthorization';
import createAuthorizationForm from './authorization.template';
import { storage } from '../../core/utils';

export default class Authorization extends Component {
  static className = 'Authorization';

  constructor($root, options) {
    super($root, {
      name: 'Authorization',
      listeners: ['click'],
      ...options,
    });

    this.api = options.api;

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

    // взять из поля юзернейм
    const userName = 'Julia\'s cat';
    const userEmail = document.getElementById('registerName').value;
    const password = document.getElementById('registerPassword').value;

    try {
      const userData = { name: `${userName}`, email: `${userEmail}`, password: `${password}` };

      await this.api.createUser(userData);
      const loginUserResponse = await this.api.loginUser(userData);

      const now = new Date();
      const tokenExpiresIn = now.setHours(now.getHours() + 4);

      storage('userId', loginUserResponse.userId);
      storage('userName', loginUserResponse.name);
      storage('currentToken', loginUserResponse.token);
      storage('refreshToken', loginUserResponse.refreshToken);
      storage('tokenExpiresIn', tokenExpiresIn);

      this.emit('selectPage', 'MainPage');
    } catch {
      document.querySelector('.alert-error-register').classList.remove('d-none');
      setTimeout(clearRegister, 2000);
    }
  }

  async onSubmitLoginForm(event) {
    event.preventDefault();

    document.querySelector('.alert-error-login').classList.add('d-none');

    const user = document.getElementById('loginName').value;
    const password = document.getElementById('loginPassword').value;

    try {
      const loginUserResponse = await this.api.loginUser({
        email: `${user}`,
        password: `${password}`,
      });

      const now = new Date();
      const tokenExpiresIn = now.setHours(now.getHours() + 4);

      storage('userId', loginUserResponse.userId);
      storage('userName', loginUserResponse.name);
      storage('currentToken', loginUserResponse.token);
      storage('refreshToken', loginUserResponse.refreshToken);
      storage('tokenExpiresIn', tokenExpiresIn);

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

  static checkTokenValidity() {
    const userId = storage('userId');
    const userName = storage('userName');
    const currentToken = storage('currentToken');
    const refreshToken = storage('refreshToken');
    const currentPage = storage('currentPage');
    const tokenExpiresIn = Number(storage('tokenExpiresIn'));

    if (!currentToken || (new Date().getTime() - tokenExpiresIn > 0)) {
      return false;
    }

    return {
      userId, userName, currentToken, refreshToken, currentPage,
    };
  }
}
