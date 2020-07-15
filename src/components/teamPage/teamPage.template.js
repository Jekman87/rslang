import team from './team';

function createMembersHTML(data) {
  const html = data.map((member) => {
    const {
      name, title, location, email, telegram, github, avatar, about,
    } = member;
    return `
    <!-- column  -->
        <div class="col-lg-12">
          <div class="card card-shadow border-0 mb-4 p-3">
            <!-- Row -->
            <div class="row no-gutters align-items-center">
              <div class="col-md-3 justify-content-center align-content-center">
                <div class="team-img d-flex justify-content-center align-content-center m-3">
                    <img class="team-img-avatar img-fluid rounded-circle " src="${avatar}" alt="team member"></p>
                </div>
                <div class="team-img-hover rounded-circle d-flex justify-content-center align-content-center">
                  <a class="align-self-center" href="https://github.com/${github}" target="_blank"><i class="fab fa-2x fa-github"></i></a>
                </div>
              </div>
              <div class="col-md-9 bg-white">
                <div class="p-1">
                  <h4 class="card-title text-success mb-1">${name}<span class="font-weight-light font-italic text-primary text-muted">, ${title}</span></h4>              
                  <small class="text-muted"><cite title="${location.city},${location.country}"><a href="http://maps.google.com/?q=${location.city}" target="_blank"><i class="fas fa-map-marker-alt"></i></a> ${location.city}, ${location.country}</cite></small>
                  <p class="mt-2">
                    <i class="fas fa-envelope"></i> <a href="mailto:${email}">${email}</a>
                    <br />
                    <i class="fab fa-telegram"></i> <a href="tg://resolve?domain=${telegram}">${telegram}</a>
                    <br />
                    <i class="fab fa-github"></i> <a href="https://github.com/${github}" target="_blank">github</a>
                </div>
                <div class="p-1">
                  <p class="m-0 text-info">Вклад в разработку:</p>
                  <p class="m-0">${about}</p>
                </div>
              </div>
            </div>
            <!-- Row -->
          </div>
      </div>
    `;
  });
  return html.join('');
}

export default function createAboutTeamHTML() {
  return `
  <div class="container mt-3">
    <div class="jumbotron mb-0">
      <div class="heading-title">
        <h1 class="display-4"><i class="fas fa-users"></i> Наша команда</h1>
        <p class="pt-1 half-txt">Представление каждого участника команды и описание его вклада в разработку приложения. </p>
      </div>
      <div class="row">
      ${createMembersHTML(team)}
    </div>
  </div>
  `;
}
