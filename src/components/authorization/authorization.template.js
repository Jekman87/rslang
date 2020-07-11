export default function createAuthorizationForm() {
  return `
    <div class="container" style="margin-top: 7%;">
      <h1 class="main-title my-5 text-center text-primary display-1">
        RS Lang
      </h1>
      <div class="my-5 col-10 col-md-5 ml-auto mr-auto py-4 authorization-form">
        <form class="register-form d-none">
          <div class="alert alert-success text-center alert-success-register d-none" role="alert">
            Успешно!
          </div>
          <div class="alert alert-danger text-center alert-error-register d-none" role="alert">
            Пользователь уже существует.
          </div>
          <div class="form-group">
            <input
              type="email"
              class="form-control form-control-lg"
              id="registerName"
              aria-describedby="emailHelp"
              placeholder="e-mail"
              autocomplete="off"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="username"
              class="form-control form-control-lg"
              id="userName"
              aria-describedby="usernameHelp"
              placeholder="имя пользователя"
              autocomplete="off"
              required
            />
          </div>
          <div class="form-group mb-4">
            <input
              type="password"
              class="form-control form-control-lg"
              id="registerPassword"
              placeholder="пароль"
              pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}"
              required
            />
            <small
              id="passwordHelpBlock"
              class="form-text  text-justify pass-tip "
            >
              Ваш пароль должен содержать по крайней мере 8 символов, одну прописную, 
              одну строчную букву и специальный символ
            </small>
          </div>
          <button type="submit" class="btn btn-primary btn-lg btn-block" name = "btn-submit-register">
            РЕГИСТРАЦИЯ
          </button>
          <p
            class="display-6 text-center  font-weight-light sign-in-text my-2"
          >
            Уже зарегистрированы?
            <a href="#" class="text-primary change-form-link">
              Войти
            </a>
          </p>
        </form>
        <form class="login-form">
          <div class="alert alert-danger alert-error-login text-center d-none" role="alert">
            Некорректная почта или пароль, пожалуйста, попробуйте еще раз
          </div>
          <div class="form-group">
            <input
              type="email"
              class="form-control form-control-lg"
              id="loginName"
              aria-describedby="emailHelp"
              placeholder="e-mail"
              autocomplete="off"
              required
            />
          </div>
          <div class="form-group mb-4">
            <input type="password" class="form-control form-control-lg" id="loginPassword" placeholder="пароль" required />
          </div>

          <button type="submit" class="btn btn-primary btn-lg btn-block">
            ВОЙТИ
          </button>
          <p class="display-6 text-center font-weight-light sign-in-text my-2">
            Не зарегистрированы?
            <a href="#" class="text-primary  change-form-link">
              Создать аккаунт
            </a>
          </p>
        </form>
      </div>
    </div>
  `;
}
