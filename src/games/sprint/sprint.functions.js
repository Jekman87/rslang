const state = { currentTime: 60 };

function hideIntro(el) {
  el.find('.intro').css({ display: 'none' });
}

function check(el) {
  console.log(el);
}

function opacityOn() {
  document.querySelector('.countdown').style.opacity = '100';
}

function opacityOff() {
  document.querySelector('.countdown').style.opacity = '0';
}

function Ready() {
  document.querySelector('.countdown').innerHTML = 'Ready...';
}

function Set() {
  document.querySelector('.countdown').innerHTML = 'Set...';
}

function Go() {
  document.querySelector('.countdown').innerHTML = 'Go!';
}

function hideCountdown() {
  document.querySelector('.main-sp').style.display = 'none';
}

function countdown() {
  let timer;

  state.currentTime -= 1;
  document.querySelector('.timer').innerHTML = state.currentTime;

  if (state.currentTime < 1) {
    clearTimeout(timer);
  } else {
    timer = setTimeout(countdown, 1000);
  }
}

function readySetGo() {
  setTimeout(Ready, 500);
  setTimeout(opacityOn, 500);
  setTimeout(opacityOff, 1500);
  setTimeout(Set, 2000);
  setTimeout(opacityOn, 2000);
  setTimeout(opacityOff, 3000);
  setTimeout(Go, 3500);
  setTimeout(opacityOn, 3500);
  setTimeout(opacityOff, 4500);
  setTimeout(hideCountdown, 5000);
  setTimeout(countdown, 5400);
}

export { hideIntro, readySetGo, check };
