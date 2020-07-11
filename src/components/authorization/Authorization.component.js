import $$ from '../../core/domManipulation';
import Component from '../../core/Component';
import createAuthorizationForm from './authorization.template';

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
      // console.log(clickedElement);
    }
  }

  async onSubmitRegisterForm(event) {
    event.preventDefault();

    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('registerName').value;
    const password = document.getElementById('registerPassword').value;

    try {
      const userData = {
        name: `${userName}`,
        email: `${userEmail}`,
        password,
      };

      await this.api.createUser(userData);
      await this.api.loginUser(userData);

      this.emit('selectPage', 'MainPage');
    } catch {
      document.querySelector('.alert-error-register').classList.remove('d-none');
    }
  }

  async onSubmitLoginForm(event) {
    event.preventDefault();

    document.querySelector('.alert-error-login').classList.add('d-none');

    const user = document.getElementById('loginName').value;
    const password = document.getElementById('loginPassword').value;

    try {
      await this.api.loginUser({
        email: `${user}`,
        password: `${password}`,
      });

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

  onClickRegisterEye() {
    const inputPassword = document.getElementById('registerPassword');
    if (inputPassword.type === 'password') {
      inputPassword.type = 'text';
    } else inputPassword.type = 'password';
  }

  init() {
    super.init();
    this.registerForm = document.querySelector('.register-form');
    this.registerForm.onsubmit = this.onSubmitRegisterForm;

    this.loginForm = document.querySelector('.login-form');
    this.loginForm.onsubmit = this.onSubmitLoginForm;

    this.changeFormLinks = document.querySelectorAll('.change-form-link');
    this.changeFormLinks.forEach((link) => {
      link.addEventListener('click', this.onClickChangeFormLink);
    });

    this.registerEye = document.getElementById('register-eye');
    this.registerEye.addEventListener('click', this.onClickRegisterEye);
  }

  toHTML() {
    return createAuthorizationForm().trim();
  }
}
