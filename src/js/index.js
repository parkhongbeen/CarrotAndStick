let todayCommitCount = 0;
let gitEvent = [];

// DOMs
const $inputGithub = document.querySelector('.input-github');
const $btnOk = document.querySelector('.btn-ok');
const $btnClose = document.querySelector('.btn-close');
const $popup = document.querySelector('.popup');
const $overlay = document.querySelector('.overlay');
const $inputCommit = document.querySelector('.popup-daily-commit');
const $countNowNumber = document.querySelector('.count-now-number');
const $refresh = document.querySelector('.refresh');

const openPopup = () => {
  $popup.style.display = 'block';
  $overlay.style.display = 'block';
  $inputCommit.focus();
  $inputGithub.value = '';
};

const closePopup = () => {
  $popup.style.display = 'none';
  $overlay.style.display = 'none';
  $inputGithub.focus();
  $inputGithub.classList.remove('input-github-sucess');
  $inputGithub.classList.remove('input-github-error');
  $inputGithub.placeholder = 'Enter your GITHUB URL!';
};

const saveForcommit = () => {
  let saveGoal = 0;
  const $countGoalcommit = document.querySelector('.count-goal-number');
  const $warningText = document.querySelector('.warning-text');
  const regxr = /^([0-9]){1,3}$/;
  const regxrzero = /^[^0]/;
  const goalCommit = $inputCommit.value;
  $warningText.textContent = '';
  // console.log(regxrzero.test(goalCommit));

  if (regxr.test(goalCommit) && regxrzero.test(goalCommit)) {
    saveGoal = goalCommit;
    $countGoalcommit.textContent = saveGoal;
    closePopup();
  } else {
    $inputCommit.value = '';
    $warningText.textContent = '1부터 999 사이의 숫자를 입력해주세요.';
  }
};

const getEvent = () => {
  let date = '';

  gitEvent.forEach(eventList => {
    date = new Date(eventList.created_at).toDateString();
    if (date === new Date().toDateString()) {
      eventList.type === 'PushEvent' || eventList.type === 'PullRequestEvent' ||  eventList.type === 'IssuesEvent' ? ++todayCommitCount : '';
    }
  });
  console.log(todayCommitCount);
  return todayCommitCount;
};


// 이벤트 함수
const getGitHubCommit = async username => {
  try {
    const res = await axios.get(`https://api.github.com/users/${username}/events`);
    gitEvent = res.data;
    $countNowNumber.textContent = getEvent();
  } catch (error) {
    console.log(error);
  }
};

// Events
$inputGithub.onkeyup = ({ keyCode }) => {
  const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=_-])(?=.*[0-9]).{6,16}$/;

  if (keyCode !== 13) return;
  if ($inputGithub.value === '') {
    $inputGithub.classList.add('input-github-error');
    $inputGithub.placeholder = 'Please enter your Nickname.';
  } else if (regExp.test($inputCommit.value)) {
    $inputGithub.classList.add('input-github-error');
    $inputGithub.placeholder = 'This is not a valid Nickname.';
    $inputGithub.value = '';
  } else {
    $inputGithub.classList.add('input-github-sucess');
    $inputGithub.placeholder = 'Thank you for using.';
    getGitHubCommit($inputGithub.value);
    console.log('abcd');
    openPopup();
  }
  $inputGithub.value = '';
};

$btnOk.onclick = () => {
  saveForcommit();
};

$inputCommit.onkeyup = ({ keyCode }) => {
  if (keyCode !== 13) return;
  saveForcommit();
};

$btnClose.onclick = () => {
  closePopup();
};

// $refresh.onclick = () => {

// };