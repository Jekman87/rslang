export default function createAuthorizationForm() {
  return `
    <h1 class="main-title my-5 text-center text-primary display-1">
      RS Lang
    </h1>
    <div class="my-5 col-10 col-md-5 ml-auto mr-auto py-4 authorization-form">
      
      <form class="register-form">
        <div class="alert alert-success text-center alert-success-register d-none" role="alert">
          Success!
        </div>
        <div class="alert alert-danger text-center alert-error-register d-none" role="alert">
          Something went wrong...
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
        <div class="form-group mb-4">
          <input
            type="password"
            class="form-control form-control-lg"
            id="registerPassword"
            placeholder="password"
            pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}"
            required
          />
          <small
            id="passwordHelpBlock"
            class="form-text  text-justify pass-tip "
            style="color: #6c757d;"
          >
          Your password must contain at least: 8 characters, one lowercase
            letter, one uppercase letter, special character
          </small>
        </div>
        
        <button type="submit" class="btn btn-primary btn-lg btn-block" name = "btn-submit-register">
          REGISTER
        </button>
        <p
          class="display-6 text-center text-muted font-weight-light sign-in-text my-2"
        >
          Already registered?
          <a href="#" class="text-primary change-form-link">
            Sign In
          </a>
        </p>
      </form>
      <form class="login-form d-none">
        <div class="alert alert-danger alert-error-login text-center d-none" role="alert">
          Incorrect E-mail or password, please try again.
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
          <input type="password" class="form-control form-control-lg" id="loginPassword" placeholder="password" required />
        </div>

        <button type="submit" class="btn btn-primary btn-lg btn-block">
          LOGIN
        </button>
        <p class="display-6 text-center text-muted font-weight-light sign-in-text my-2">
          Not registered?
          <a href="#" class="text-primary  change-form-link">
            Create an account
          </a>
        </p>
      </form>
    </div>
  `;
}

/* <div class="container-fluid authorization-page"> */
// </div>
